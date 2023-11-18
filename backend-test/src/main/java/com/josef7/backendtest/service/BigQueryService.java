package com.josef7.backendtest.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.bigquery.*;
import org.springframework.http.ResponseEntity;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class BigQueryService
{
    public String getData(String sqlQuery) throws InterruptedException, IOException
    {
        String jsonPath = "/home/josef7/programacion/ver+/second-test/backend-test/CloudDemo_jf7_service.json";
        GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream(jsonPath));

        BigQuery bigQuery = BigQueryOptions.newBuilder().setCredentials(credentials).build().getService();

        QueryJobConfiguration queryConfig =
                QueryJobConfiguration.newBuilder(
                                "SELECT * "
                                        + "FROM `bigquery-public-data.google_trends.top_terms` "
                                        + "WHERE " + sqlQuery
                                        + "LIMIT 10 "
                        )
                        .setUseLegacySql(false)
                        .build();

        JobId jobId = JobId.of(UUID.randomUUID().toString());
        Job queryJob = bigQuery.create(JobInfo.newBuilder(queryConfig).setJobId(jobId).build());

        queryJob = queryJob.waitFor();

        if (queryJob == null)
        {
            throw new RuntimeException("Job no longer exists");
        }
        else if (queryJob.getStatus().getError() != null)
        {
            throw new RuntimeException(queryJob.getStatus().getError().toString());
        }

        TableResult result = queryJob.getQueryResults();

        StringBuilder resultInfo = new StringBuilder();

        for (FieldValueList row : result.iterateAll())
        {
            String dmaName = row.get("dma_name").getStringValue();

            // Agregar la información de la fila al StringBuilder
            resultInfo.append("\nDma Name: ").append(dmaName)
                    .append("\n\n"); // Separador para cada fila
        }

        return resultInfo.toString();
    }

    public ResponseEntity<List<Integer>> getDMAs() throws InterruptedException, IOException
    {
        String jsonPath = "/home/josef7/programacion/ver+/second-test/backend-test/CloudDemo_jf7_service.json";
        GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream(jsonPath));

        BigQuery bigQuery = BigQueryOptions.newBuilder().setCredentials(credentials).build().getService();

        QueryJobConfiguration queryConfig =
                QueryJobConfiguration.newBuilder(
                                "SELECT DISTINCT dma_id "
                                        + "FROM `bigquery-public-data.google_trends.top_terms` "
                                        + "ORDER BY dma_id ASC "
                        )
                        .setUseLegacySql(false)
                        .build();

        JobId jobId = JobId.of(UUID.randomUUID().toString());
        Job queryJob = bigQuery.create(JobInfo.newBuilder(queryConfig).setJobId(jobId).build());

        queryJob = queryJob.waitFor();

        if (queryJob == null)
        {
            throw new RuntimeException("Job no longer exists");
        }
        else if (queryJob.getStatus().getError() != null)
        {
            throw new RuntimeException(queryJob.getStatus().getError().toString());
        }

        TableResult result = queryJob.getQueryResults();

        List<Integer> resultInfo = new ArrayList<>();

        for (FieldValueList row : result.iterateAll())
        {
            int dmaId = row.get("dma_id").getNumericValue().intValue();

            // Agregar la información de la fila al StringBuilder
            resultInfo.add(dmaId);
        }

        return ResponseEntity.ok(resultInfo);
    }

    public String fetchService() throws InterruptedException, IOException
    {
        String jsonPath = "/home/josef7/programacion/ver+/second-test/backend-test/CloudDemo_jf7_service.json";
        GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream(jsonPath));

        BigQuery bigQuery = BigQueryOptions.newBuilder().setCredentials(credentials).build().getService();

        QueryJobConfiguration queryConfig =
                QueryJobConfiguration.newBuilder(
                                "SELECT * "
                                        + "FROM `bigquery-public-data.google_trends.top_terms` "
                                        + "ORDER BY refresh_date DESC "
                                        + "LIMIT 10 "
                        )
                        .setUseLegacySql(false)
                        .build();

        JobId jobId = JobId.of(UUID.randomUUID().toString());
        Job queryJob = bigQuery.create(JobInfo.newBuilder(queryConfig).setJobId(jobId).build());

        queryJob = queryJob.waitFor();

        if (queryJob == null)
        {
            throw new RuntimeException("Job no longer exists");
        }
        else if (queryJob.getStatus().getError() != null)
        {
            throw new RuntimeException(queryJob.getStatus().getError().toString());
        }

//        QueryResponse response = bigQuery.getQueryResults(jobId);
        TableResult result = queryJob.getQueryResults();

        StringBuilder resultInfo = new StringBuilder();

        for (FieldValueList row : result.iterateAll())
        {
            String refreshDate = row.get("refresh_date").getStringValue();
            String dmaName = row.get("dma_name").getStringValue();
            String dmaId = row.get("dma_id").getStringValue();
            String term = row.get("term").getStringValue();
            String week = row.get("week").getStringValue();
            String rank = row.get("rank").getStringValue();

//			Integer score = null;
//			Object scoreObject = row.get("score");
//
//			if (scoreObject != null)
//			{
//				BigDecimal scoreValue = (BigDecimal) scoreObject;
//				score = scoreValue.intValue();
//			}

//            System.out.printf("%d\t%s\t%s\t%d\t%s\t%s\t%d\n", percentGain, refreshDate, dmaName, dmaId, term, week, rank);

            // Agregar la información de la fila al StringBuilder
            resultInfo.append("\nRefresh Date: ").append(refreshDate)
                    .append("\nDma Name: ").append(dmaName)
                    .append("\nDma ID: ").append(dmaId)
                    .append("\nTerm: ").append(term)
                    .append("\nWeek: ").append(week)
                    .append("\nRank: ").append(rank)
                    .append("\n\n"); // Separador para cada fila
        }

        return resultInfo.toString();
    }
}

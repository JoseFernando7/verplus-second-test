package com.josef7.backendtest.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.bigquery.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;

/**
 * Makes the query to the dataset and set the google cloud credentials.
 *
 * @author josef7
 * @version 1.0.0
 */
public class BigQueryService
{
    /**
     * Receive the query and the columns to send the query to the BigQuery API.
     *
     * @param query - A text of the user query built in the client side.
     * @param columns - A list with the columns selected to make the query.
     * @return - A list of QueryResponse objects with the data that the dataset returned after executed the query.
     * @throws InterruptedException - Occurs when there's an error in the write or read of the data either entering or leaving the server.
     * @throws IOException - Occurs when the thread is interrupted.
     */
    public List<QueryResponse> getData(String query, List<String> columns) throws InterruptedException, IOException
    {
        @Value("${GOOGLE_CREDENTIALS}")
        String jsonPath = googleCredentials;
        GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream(jsonPath));

        BigQuery bigQuery = BigQueryOptions.newBuilder().setCredentials(credentials).build().getService();

        QueryJobConfiguration queryConfig =
                QueryJobConfiguration.newBuilder(query)
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
        List<QueryResponse> resultInfo = new ArrayList<>();

        for (String column : columns) {
            QueryResponse queryResponse = new QueryResponse();
            List<Object> values = new ArrayList<>();

            for (FieldValueList row : result.iterateAll()) {
                if (row.get(column) != null) {
                    // Agrega el valor directamente a la lista de objetos
                    values.add(row.get(column).getStringValue());
                }
            }

            // Configura la lista de objetos en el QueryResponse
            queryResponse.setResponse(values);
            resultInfo.add(queryResponse);
        }

        return resultInfo;
    }
}

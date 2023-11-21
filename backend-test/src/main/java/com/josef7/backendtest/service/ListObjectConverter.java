package com.josef7.backendtest.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;


import java.io.IOException;
import java.util.List;

@Converter
public class ListObjectConverter implements AttributeConverter<List<Object>, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<Object> list) {
        try {
            return objectMapper.writeValueAsString(list);
        } catch (JsonProcessingException e) {
            // Manejar la excepción según tus necesidades
            throw new RuntimeException("Error al convertir la lista a JSON", e);
        }
    }

    @Override
    public List<Object> convertToEntityAttribute(String json) {
        try {
            return objectMapper.readValue(json, List.class);
        } catch (IOException e) {
            // Manejar la excepción según tus necesidades
            throw new RuntimeException("Error al convertir JSON a lista", e);
        }
    }
}

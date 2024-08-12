DROP VIEW if exists ${schema:raw}.vw_total_population CASCADE;

CREATE OR REPLACE VIEW ${schema:raw}.vw_total_population AS
SELECT SUM((data_element->>'Population')::int) AS total_population
FROM ${schema:raw}.api_data,
LATERAL jsonb_array_elements(doc_record->'data') AS data_element
WHERE (data_element->>'Year')::text IN ('2018', '2019', '2020')
;
package com.pep.luckycoin.repository.search;

import com.pep.luckycoin.domain.Credit;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Credit entity.
 */
public interface CreditSearchRepository extends ElasticsearchRepository<Credit, Long> {
}

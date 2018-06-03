package com.pep.luckycoin.repository.search;

import com.pep.luckycoin.domain.Announcement;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Announcement entity.
 */
public interface AnnouncementSearchRepository extends ElasticsearchRepository<Announcement, Long> {
}

package com.pep.luckycoin.repository;

import com.pep.luckycoin.domain.Announcement;
import com.pep.luckycoin.domain.enumeration.Status;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.time.LocalDate;
import java.util.List;

/**
 * Spring Data JPA repository for the Announcement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

    @Query("select announcement from Announcement announcement where announcement.owner.login = ?#{principal.username}")
    List<Announcement> findByOwnerIsCurrentUser();

    @Query("select announcement from Announcement announcement where announcement.winner.login = ?#{principal.username}")
    List<Announcement> findByWinnerIsCurrentUser();

    List<Announcement> findByStatus(Status status);

    List<Announcement> findByFinishDate(LocalDate date);
}

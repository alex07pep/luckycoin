package com.pep.luckycoin.service.util;

import org.apache.commons.lang3.RandomStringUtils;

/**
 * Utility class for Luckycoin :)
 * - here is generated the Lucky Winner.
 * - for generating random Strings
 * - other methods.
 */
public final class RandomUtil {

    private static final int DEF_COUNT = 20;

    private RandomUtil() {
    }

    /**
     * Generate a password.
     *
     * @return the generated password
     */
    public static String generatePassword() {
        return RandomStringUtils.randomAlphanumeric(DEF_COUNT);
    }

    /**
     * Generate an activation key.
     *
     * @return the generated activation key
     */
    public static String generateActivationKey() {
        return RandomStringUtils.randomNumeric(DEF_COUNT);
    }

    /**
     * Generate a reset key.
     *
     * @return the generated reset key
     */
    public static String generateResetKey() {
        return RandomStringUtils.randomNumeric(DEF_COUNT);
    }

    /**
     * Calculate the max number of tickets available for a product.
     *
     * @return number of tickets
     */
    public static Long calculateNumberOfTickets(Long announcementPrice, int ticketValue) {
        return (announcementPrice + ticketValue - 1) / ticketValue;
    }
}

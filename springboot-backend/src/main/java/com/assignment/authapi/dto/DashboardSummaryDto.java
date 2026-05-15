package com.assignment.authapi.dto;

import java.util.List;
import java.util.Map;

public class DashboardSummaryDto {
    private String title;
    private String subtitle;
    private List<Map<String, String>> stats;

    public DashboardSummaryDto(String title, String subtitle, List<Map<String, String>> stats) {
        this.title = title;
        this.subtitle = subtitle;
        this.stats = stats;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public List<Map<String, String>> getStats() {
        return stats;
    }

    public void setStats(List<Map<String, String>> stats) {
        this.stats = stats;
    }
}

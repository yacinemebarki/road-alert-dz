export type AlertLike = {
    _id?: string;
    view?: string;
    post?: {
        _id?: string;
        title?: string;
        location?: string;
        status?: string;
    };
};

export function buildReportRows(alerts: AlertLike[]) {
    return alerts
        .filter((alert) => ['New', 'Update'].includes(alert.view ?? ''))
        .map((alert) => ({
            id: alert._id ?? '',
            postId: alert.post?._id ?? '',
            title: alert.post?.title ?? 'Untitled alert',
            wilaya: alert.post?.location ?? 'Unknown location',
            status: alert.post?.status ?? 'Broken',
            action: 'Review',
        }));
}

export function isPublicAlertVisible(alert: AlertLike) {
    return (alert.view ?? 'Old') === 'Old';
}

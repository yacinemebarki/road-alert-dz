import { describe, expect, it } from 'vitest';
import { buildReportRows, isPublicAlertVisible } from './admin-dashboard.logic';

describe('alert workflow helpers', () => {
    it('keeps only new or update alerts for the admin queue', () => {
        const alerts = [
            {
                _id: 'a1',
                view: 'New',
                post: { _id: 'p1', title: 'Big hole', location: 'Alger', status: 'Broken' },
            },
            {
                _id: 'a2',
                view: 'Update',
                post: { _id: 'p2', title: 'Road work', location: 'Oran', status: 'In Progress' },
            },
            {
                _id: 'a3',
                view: 'Old',
                post: { _id: 'p3', title: 'Done fix', location: 'Setif', status: 'Fixed' },
            },
        ] as any;

        expect(buildReportRows(alerts)).toHaveLength(2);
        expect(buildReportRows(alerts)[0].title).toBe('Big hole');
        expect(buildReportRows(alerts)[1].status).toBe('In Progress');
    });

    it('hides new and update alerts from the public post page', () => {
        const alerts = [
            { _id: 'a1', view: 'Old', post: { _id: 'p1', title: 'Public fix', location: 'Alger', status: 'Fixed' } },
            { _id: 'a2', view: 'New', post: { _id: 'p2', title: 'Hidden new', location: 'Oran', status: 'Broken' } },
            { _id: 'a3', view: 'Update', post: { _id: 'p3', title: 'Hidden update', location: 'Setif', status: 'In Progress' } },
        ] as any;

        const visibleAlerts = alerts.filter((alert: any) => isPublicAlertVisible(alert));
        expect(visibleAlerts).toHaveLength(1);
        expect(visibleAlerts[0].post.title).toBe('Public fix');
    });
});

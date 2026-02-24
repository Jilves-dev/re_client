import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/auth';

export default function useUnreadCount() {
  const [auth] = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = useCallback(async () => {
    // Älä hae jos ei kirjautunut
    if (!auth?.token) return;

    try {
      const { data } = await axios.get('/unread-count');
      setUnreadCount(data.count || 0);
    } catch (err) {
      // Hiljaa epäonnistuminen — ei häiritä käyttäjää
      console.error('Unread count fetch failed:', err);
    }
  }, [auth?.token]);

  useEffect(() => {
    // Hae heti kun kirjaudutaan
    fetchUnreadCount();

    // Pollaa 30 sekunnin välein
    const interval = setInterval(fetchUnreadCount, 30000);

    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  const markAsRead = useCallback(async () => {
    if (!auth?.token) return;

    try {
      await axios.put('/mark-messages-read');
      setUnreadCount(0);
    } catch (err) {
      console.error('Mark as read failed:', err);
    }
  }, [auth?.token]);

  return { unreadCount, markAsRead, fetchUnreadCount };
}

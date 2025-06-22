import {
  getUserNotificationsService,
  markNotificationAsReadService,
  markAllNotificationsAsReadService,
} from "../services/notification.service.js";

export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await getUserNotificationsService(userId);
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Erreur dans getUserNotifications:", error.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const userId = req.user._id;
    const notificationId = req.params.id;
    const updatedNotification = await markNotificationAsReadService(
      userId,
      notificationId
    );
    res.status(200).json(updatedNotification);
  } catch (error) {
    console.error("Erreur dans markNotificationAsRead:", error.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const markAllNotificationsAsRead = async (req, res) => {
  try {
    const userId = req.user._id;
    await markAllNotificationsAsReadService(userId);
    res.status(200).json({ message: "Toutes les notifications ont été lues" });
  } catch (error) {
    console.error("Erreur dans markAllNotificationsAsRead:", error.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

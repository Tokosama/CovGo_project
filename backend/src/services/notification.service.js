import Notification from "../models/notification.model.js";

export const getUserNotificationsService = async (userId) => {
  return await Notification.find({ user_id: userId }).sort({ createdAt: -1 });
};

export const markNotificationAsReadService = async (userId, notificationId) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: notificationId, user_id: userId },
    { vue: true },
    { new: true }
  );

  if (!notification) {
    throw new Error("Notification non trouvée ou non autorisée");
  }

  return notification;
};

export const markAllNotificationsAsReadService = async (userId) => {
  await Notification.updateMany({ user_id: userId, vue: false }, { vue: true });
};

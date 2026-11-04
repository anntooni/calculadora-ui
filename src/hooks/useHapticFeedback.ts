import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

type FeedbackType = "selection" | "success" | "error";

export function useHapticFeedback() {
  return (type: FeedbackType = "selection") => {
    let feedback: Promise<void>;

    if (Platform.OS === "android") {
      const androidType =
        type === "success"
          ? Haptics.AndroidHaptics.Confirm
          : type === "error"
            ? Haptics.AndroidHaptics.Reject
            : Haptics.AndroidHaptics.Keyboard_Tap;
      feedback = Haptics.performAndroidHapticsAsync(androidType);
    } else if (type !== "selection") {
      const notificationType =
        type === "success"
          ? Haptics.NotificationFeedbackType.Success
          : Haptics.NotificationFeedbackType.Error;
      feedback = Haptics.notificationAsync(notificationType);
    } else {
      feedback = Haptics.selectionAsync();
    }

    void feedback.catch(() => undefined);
  };
}
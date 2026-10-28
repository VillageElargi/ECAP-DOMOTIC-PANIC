import { CameraView, useCameraPermissions } from "expo-camera";
import { Lightbulb } from "lucide-react-native";
import { useEffect, useState } from "react"; // 1. On importe useEffect
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "./button";

export default function TorchButton() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isTorchOn, setIsTorchOn] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <>
      <Modal transparent visible={!permission.granted}>
        <View style={styles.container}>
          <View style={styles.center}>
            <Text style={styles.permissionText}>{t("torch_access")}</Text>
            <TouchableOpacity
              style={styles.permissionButton}
              onPress={requestPermission}
            >
              <Text style={styles.permissionButtonText}>{t("retry")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {permission.granted && (
        <CameraView
          style={styles.hiddenCamera}
          enableTorch={isTorchOn}
          facing="back"
          active={true}
        />
      )}
      <Button
        disabled={!permission.granted}
        mainText={t("light")}
        onPress={() => setIsTorchOn(!isTorchOn)}
        icon={<Lightbulb color="#fff" />}
        active={isTorchOn}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  center: {
    width: "80%",
    height: "80%",
    backgroundColor: "#000",
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonOff: {
    backgroundColor: "#1c1c1e",
    borderWidth: 1,
    borderColor: "#3a3a3c",
  },
  buttonOn: {
    backgroundColor: "#ffd43b",
    shadowColor: "#ffd43b",
    shadowRadius: 15,
    shadowOpacity: 0.6,
  },
  statusText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  permissionText: {
    textAlign: "center",
    color: "#8e8e93",
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 20,
  },
  permissionButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  hiddenCamera: {
    width: 16,
    height: 16,
    position: "absolute",
    right: -100,
    top: -100,
  },
});

import { useVideoPlayer, VideoView } from "expo-video";
import { Camera, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import Button from "./button";

const Video = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();

  const player = useVideoPlayer(require("@/assets/security.mp4"), (player) => {
    player.loop = true;
    player.muted = true;
  });

  useEffect(() => {
    if (modalOpen) {
      player.currentTime = 0;
      player.play();
    } else {
      player.pause();
    }
  }, [modalOpen, player]);

  return (
    <>
      <Modal
        animationType="fade"
        transparent
        visible={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <View style={styles.modalContent}>
          <View style={styles.content}>
            <VideoView
              player={player}
              style={styles.video}
              nativeControls={false}
              contentFit="cover"
            />

            <Pressable style={styles.close} onPress={() => setModalOpen(false)}>
              <X color="#fff" />
            </Pressable>
          </View>
        </View>
      </Modal>

      <Button
        onPress={() => setModalOpen(true)}
        mainText={t("camera")}
        icon={<Camera color="#fff" />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(23, 80, 104, 0.5)",
  },
  content: {
    width: "80%",
    height: "80%",
    position: "relative",
    backgroundColor: "#050914",
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "rgb(37, 122, 158)",
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  close: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 1,
    padding: 5,
  },
});

export default Video;

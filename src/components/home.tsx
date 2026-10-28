import AnimatedCode from "@/components/animated-code";
import Board from "@/components/board";
import Button from "@/components/button";
import TorchButton from "@/components/light";
import Video from "@/components/video";

import { createPuzzle } from "@/game/initial-state";
import { generateRandomCode, hasWon, toggleCell } from "@/game/logic";

import {
  Flower,
  House,
  RotateCw,
  ShieldCheck,
  Wifi,
} from "lucide-react-native";

import { useFormattedDate } from "@/utils/date";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import LanguageSwitch from "./language-switch";

const SIZE = 4;
const SYNCCODE = "DE7H";

export default function Home() {
  const { width, height } = useWindowDimensions();
  const compact = height < 500;

  const [board, setBoard] = useState(() => createPuzzle(SIZE));
  const [isReady, setIsReady] = useState(false);
  const [showCode, setShowCode] = useState(generateRandomCode());

  const { t } = useTranslation();

  useEffect(() => {
    setBoard(createPuzzle(SIZE));
    setIsReady(true);
  }, []);

  useEffect(() => {
    setShowCode(hasWon(board) ? SYNCCODE : generateRandomCode());
  }, [board]);

  function handleCellPress(row: number, col: number) {
    if (!isReady) return;

    const nextBoard = toggleCell(board, row, col, SIZE);
    setBoard(nextBoard);
    setShowCode(hasWon(nextBoard) ? SYNCCODE : generateRandomCode());
  }

  function restartGame() {
    setBoard(createPuzzle(SIZE));
  }

  const formattedDate = useFormattedDate();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden barStyle="light-content" />

      <View style={[styles.container, compact && styles.compactContainer]}>
        <View style={styles.header}>
          <View style={styles.brand}>
            <View style={styles.brandIcon}>
              <House size={22} color="#7DD3FC" strokeWidth={1.8} />
            </View>

            <View>
              <Text style={styles.brandName}>NEXORA</Text>
              <Text style={styles.brandSubtitle}>INTELLIGENT LIVING</Text>
            </View>
          </View>

          <View style={styles.headerCenter}>
            <Text style={styles.pageTitle}>{t("control_center")}</Text>
            <Text style={styles.pageSubtitle}>{t("slogan")}</Text>
          </View>

          <Text
            style={{
              position: "absolute",
              right: "15%",
              top: 23,
              color: "#fff",
              // bottom: 4,
              opacity: 0.75,
            }}
          >
            {formattedDate}
          </Text>

          <View style={styles.connectionBadge}>
            <View style={styles.onlineDot} />
            <Wifi size={15} color="#7DD3FC" />
            <Text style={styles.connectionText}>{t("active")}</Text>
          </View>
        </View>

        <View style={styles.main}>
          <View style={styles.boardPanel}>
            <View style={styles.panelHeader}>
              <View>
                <Text style={styles.eyebrow}>{t("auto")}</Text>
                <Text style={styles.panelTitle}>{t("domotic")}</Text>
              </View>

              <View style={styles.secureBadge}>
                <ShieldCheck size={15} color="#7DD3FC" />
                <Text style={styles.secureText}>{t("local")}</Text>
              </View>
            </View>

            <View style={styles.boardContent}>
              <View style={styles.boardFrame}>
                <Board
                  board={board}
                  size={SIZE}
                  onCellPress={handleCellPress}
                />
              </View>
            </View>

            <View style={styles.boardFooter}>
              <View style={styles.footerDot} />
              <Text style={styles.footerText}>{t("touch")}</Text>
            </View>
          </View>

          <View style={styles.sidebar}>
            <View style={styles.statusPanel}>
              <View style={styles.sectionHeading}>
                <View>
                  <Text style={styles.eyebrow}>{t("security")}</Text>
                  <Text style={styles.sectionTitle}>{t("state_code")}</Text>
                </View>

                <View style={styles.statusIndicator} />
              </View>

              <View style={styles.codeBox}>
                <AnimatedCode code={showCode} />
              </View>

              <Text style={styles.codeHint}>{t("sync_code")}</Text>
            </View>

            <View style={styles.controlsPanel}>
              <View style={styles.sectionHeading}>
                <View>
                  <Text style={styles.eyebrow}>{t("items")}</Text>
                  <Text style={styles.sectionTitle}>{t("items_commands")}</Text>
                </View>
              </View>
              <View style={styles.controlItem}>
                <LanguageSwitch />
              </View>

              <View style={styles.controlItem}>
                <Video />
              </View>

              <View style={styles.controlItem}>
                <TorchButton />
              </View>

              <View style={styles.controlItem}>
                <Button
                  icon={<Flower color="#7DD3FC" size={21} />}
                  onPress={() => {}}
                  mainText={t("relax")}
                  secondText={t("no_relax")}
                  disabled
                />
              </View>

              <View style={styles.controlItem}>
                <Button
                  icon={<RotateCw color="#7DD3FC" size={21} />}
                  onPress={restartGame}
                  mainText={t("reset")}
                />
              </View>
            </View>
          </View>
        </View>

        {/* BARRE INFÉRIEURE */}
        <View style={styles.bottomBar}>
          <Text style={styles.bottomBrand}>
            NEXORA <Text style={styles.bottomMuted}>/ HOME OS 04.2</Text>
          </Text>

          <Text style={styles.bottomMuted}>{t("secure")}</Text>

          <Text style={styles.bottomVersion}>V.04.2.19</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#050914",
  },
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 10,
    paddingBottom: 8,
    backgroundColor: "#050914",
  },
  compactContainer: {
    paddingTop: 4,
    paddingBottom: 3,
  },

  // En-tête
  header: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
    paddingBottom: 14,
    marginBottom: 14,
    gap: 16,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    minWidth: 175,
  },
  brandIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#38BDF855",
    backgroundColor: "#0C2035",
    justifyContent: "center",
    alignItems: "center",
  },
  brandName: {
    color: "#F0F9FF",
    fontSize: 20,
    fontWeight: "300",
    letterSpacing: 5,
  },
  brandSubtitle: {
    color: "#7DD3FC",
    fontSize: 8,
    letterSpacing: 2,
    marginTop: 3,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  pageTitle: {
    color: "#F1F5F9",
    fontSize: 19,
    fontWeight: "600",
  },
  pageSubtitle: {
    color: "#64748B",
    fontSize: 11,
    marginTop: 4,
  },
  connectionBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#38BDF833",
    backgroundColor: "#0C2035",
    borderRadius: 9,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#4ADE80",
  },
  connectionText: {
    color: "#BAE6FD",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
  },

  // Disposition principale
  main: {
    flex: 1,
    minHeight: 0,
    flexDirection: "row",
    gap: 18,
  },

  // Plateau
  boardPanel: {
    flex: 1,
    minWidth: 0,
    minHeight: 0,
    backgroundColor: "#0B1424",
    borderWidth: 1,
    borderColor: "#26364B",
    borderRadius: 18,
    padding: 14,
  },

  panelHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexShrink: 0,
  },

  boardContent: {
    flex: 1,
    minHeight: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },

  boardFrame: {
    width: "100%",
    flex: 1,
    minHeight: 0,
    alignSelf: "center",
  },

  boardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#1E293B",
    flexShrink: 0,
  },
  eyebrow: {
    color: "#7DD3FC",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 2,
  },
  panelTitle: {
    color: "#F1F5F9",
    fontSize: 19,
    fontWeight: "600",
    marginTop: 5,
  },
  secureBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: "#0C2035",
    borderWidth: 1,
    borderColor: "#38BDF833",
    borderRadius: 8,
  },
  secureText: {
    color: "#7DD3FC",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
  },

  footerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#38BDF8",
  },
  footerText: {
    color: "#64748B",
    fontSize: 9,
    letterSpacing: 1,
  },

  sidebar: {
    width: "34%",
    maxWidth: 360,
    minWidth: 260,
    gap: 14,
  },
  statusPanel: {
    backgroundColor: "#0B1424",
    borderWidth: 1,
    borderColor: "#26364B",
    borderRadius: 14,
    padding: 15,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#F1F5F9",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4ADE80",
  },
  codeBox: {
    minHeight: 53,
    borderRadius: 10,
    backgroundColor: "#07101D",
    borderWidth: 1,
    borderColor: "#38BDF833",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  codeHint: {
    color: "#64748B",
    fontSize: 8,
    letterSpacing: 1.5,
    textAlign: "center",
    marginTop: 10,
  },
  controlsPanel: {
    flex: 1,
    minHeight: 0,
    backgroundColor: "#0B1424",
    borderWidth: 1,
    borderColor: "#26364B",
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },
  controlItem: {
    minHeight: 0,
  },

  bottomBar: {
    minHeight: 29,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
  },
  bottomBrand: {
    color: "#7DD3FC",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
  },
  bottomMuted: {
    color: "#52647B",
    fontSize: 9,
    letterSpacing: 1,
  },
  bottomVersion: {
    color: "#64748B",
    fontSize: 9,
  },
});

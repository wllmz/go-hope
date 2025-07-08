import React, { useState } from "react";
import { Box, IconButton, styled } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import LevelGauge from "../components/LevelGauge";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
  padding: "16px",
});

const Header = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  marginBottom: "24px",
});

const Title = styled(Box)({
  fontSize: "16px",
  fontWeight: 500,
  color: "#333",
});

const GaugeContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
});

const GaugeItem = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

const GaugeTitle = styled(Box)({
  fontSize: "14px",
  color: "#666",
  marginBottom: "8px",
});

const SensorielGaugeView = ({ data, onUpdate, onBack, selectedDate }) => {
  const [localData, setLocalData] = useState(data);

  const handleNiveauChange = async (type, newNiveau) => {
    try {

      // Mise à jour locale immédiate
      setLocalData((prev) => ({
        ...prev,
        [type]: newNiveau,
      }));

      // Créer l'objet de mise à jour
      const sensorielData = {};
      sensorielData[type] = newNiveau;

      await onUpdate(selectedDate, data._id, sensorielData);

    } catch (error) {
      
      // Revenir à l'état précédent en cas d'erreur
      setLocalData((prev) => ({
        ...prev,
        [type]: data[type],
      }));
    }
  };

  return (
    <Container>
      <Header>
        <IconButton onClick={onBack} size="small">
          <ArrowBack />
        </IconButton>
        <Title>
          {localData.zone} {localData.side}
        </Title>
      </Header>

      <GaugeContainer>
        <GaugeItem>
          <GaugeTitle>Fourmillements</GaugeTitle>
          <LevelGauge
            niveau={localData.fourmillement}
            onNiveauChange={(newNiveau) =>
              handleNiveauChange("fourmillement", newNiveau)
            }
            type="sensoriel"
          />
        </GaugeItem>

        <GaugeItem>
          <GaugeTitle>Picotements</GaugeTitle>
          <LevelGauge
            niveau={localData.picotements}
            onNiveauChange={(newNiveau) =>
              handleNiveauChange("picotements", newNiveau)
            }
            type="sensoriel"
          />
        </GaugeItem>

        <GaugeItem>
          <GaugeTitle>Brûlures</GaugeTitle>
          <LevelGauge
            niveau={localData.brulures}
            onNiveauChange={(newNiveau) =>
              handleNiveauChange("brulures", newNiveau)
            }
            type="sensoriel"
          />
        </GaugeItem>
      </GaugeContainer>
    </Container>
  );
};

export default SensorielGaugeView;

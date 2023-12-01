import { diary } from "@/store/diarySlice";
import styled from "@emotion/styled";
import { useAppSelector } from "@/features/hooks/useAppDispatch";
import { useEffect } from "react";
import { useMap } from "@/features/hooks/useMap";

interface MapProps {
  width: string;
  height: string;
}

const Map = ({ width = "960px", height = "830px" }: MapProps) => {
  const diaryState = useAppSelector(diary);
  const { map, setMap, mapRef, displayMarker, getCurrentLocation } = useMap();

  const initializeMap = async () => {
    try {
      const currentPos = await getCurrentLocation(
        diaryState.isClickPos,
        diaryState.latitude,
        diaryState.longitude
      );
      const options = {
        center: currentPos,
        level: 3,
        draggable: false,
        zoomable: false,
        disableDoubleClickZoom: true,
      };
      const newMap = new window.kakao.maps.Map(mapRef.current, options);
      setMap(newMap);

      if (diaryState.isClickPos && map) {
        map.setCenter(currentPos);
      }
      try {
        const newMarker = await displayMarker(currentPos);
        newMarker.setMap(newMap);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.kakao.maps.load(initializeMap);
  }, [diaryState.isClickPos]);

  return (
    <StyledMap>
      <section
        ref={mapRef}
        id="map"
        style={{ width: `${width}`, height: `calc(${height} - 3.375rem)` }}
      />
    </StyledMap>
  );
};

export default Map;

const StyledMap = styled.main`
  display: flex;
  width: 100%;
`;

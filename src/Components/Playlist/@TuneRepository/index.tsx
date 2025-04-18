import { api } from "../../../lib/axios";
import { IconButtons, MainMusicTrack, MusicData, MusicTrackImage, MusicTrackName, ConfigButtons } from "./styles";
import { Trash, Play, Pause, Repeat } from "phosphor-react";
import { useEffect, useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { useQueryClient } from "@tanstack/react-query";

interface TuneRepositoryData {
  name: string;
  Img: string;
  id: number;
  playSongAtIndex: (index: number) => void;
  handleRepeatMusic: () => void;
  playMusic: () => void;
  pauseMusic: () => void;
  activeIndex: () => number;
  stopMusic: () => void;
  index: number;
}

export function TuneRepository({
  name,
  Img,
  id,
  playSongAtIndex,
  handleRepeatMusic,
  pauseMusic,
  playMusic,
  activeIndex,
  index,
}: TuneRepositoryData) {
  const queryClient = useQueryClient();
  const [isActive, setIsActive] = useState(false);


  async function deleteMusicFromUser() {
    try {
      await api.delete("/music", {
        data: { id },
      });
      queryClient.invalidateQueries({ queryKey: ["userMusics"] });
      pauseMusic();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setIsActive(activeIndex() === index);
  }, [activeIndex, index]);

  return (
    <MainMusicTrack>
    <MusicData>
        <MusicTrackImage src={Img} alt="Imagem da capa da musica" />
        <MusicTrackName>{name}</MusicTrackName>
      </MusicData>
      <ProgressBar index={index}/>
      
      <ConfigButtons>
        <IconButtons
          onClick={() => {
            const currentIndex = activeIndex();
            if (isActive) {
              pauseMusic();
              setIsActive(false);
            } else {
              if (currentIndex === index) {
                playMusic();
              } else {
                playSongAtIndex(index);
              }
              setIsActive(true);
            }
          }}
        >
          {isActive ? (
            <Pause size={25} color="#000000" weight="fill" />
          ) : (
            <Play size={25} color="#000000" weight="fill" />
          )}
        </IconButtons>
        <IconButtons onClick={handleRepeatMusic}>
          <Repeat size={28} color="#000000" weight="fill" />
        </IconButtons>
        <IconButtons onClick={async () => await deleteMusicFromUser()}>
          <Trash size={25} color="#000000" weight="fill" />
        </IconButtons>
      </ConfigButtons>
    </MainMusicTrack>
  );
}

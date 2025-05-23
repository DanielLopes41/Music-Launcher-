import {  Container, InputContainer, InputFile, Label, LoadingMessage, PlusCircleButton, SpaceToAddMusic, Title } from "./styles";
import {  ArrowUUpLeft, MusicNotes} from "phosphor-react";
import { useState } from "react";
import { MusicTrack } from "../MusicTrack";
import { useQuery } from "@tanstack/react-query";
import { PlaylistEmptyAlert } from "../EmptyPlaylist/PlaylistEmptyAlert";
import { api } from "../../../lib/axios";
import { Music } from "../../Home/MusicLibrary";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "../../Authenticate/styles";
import { useQueryClient } from '@tanstack/react-query';
import Amplitude from "amplitudejs";

export function AddMusic(){

       const queryClient = useQueryClient();
       const { data: Musics = [] } = useQuery<Music[]>({
              queryKey: ['userMusics'],
              queryFn: async () => {
                const response = await api.get(`/users`)
                return response.data.Music
              },
            }
          )

      const [returnToPlaylist, setReturnToPlaylist] = useState(false)
      const [isLoading, setIsLoading] = useState(false)

      const addMusicFormConfig = zod.object({
        musicUrl : zod.string()
        .url({message: 'Link inválido'})
      })

       type addMusicFormConfigType = zod.infer<typeof addMusicFormConfig>
       const {register, handleSubmit, reset, setError, formState: {errors}} = useForm<addMusicFormConfigType>({
          resolver: zodResolver(addMusicFormConfig)
       })
       
        async function handleAddMusic(data: addMusicFormConfigType){
          setIsLoading(true)
          try {
             await api.post('/music',{
              url:data.musicUrl
            })
            reset({
              musicUrl: ''
            })
            queryClient.removeQueries({ queryKey: ['userMusics'] });
            setReturnToPlaylist(true)
          } catch (error: unknown) {
            if (error instanceof Error && (error as import('axios').AxiosError)?.response?.status === 404) {
              setError(
                'musicUrl',
                 {message: 'Ocorreu um erro, tente novamente mais tarde'})
            }else{
              setError('musicUrl',
                {message: 'Ocorreu um erro, tente novamente mais tarde'}
              )
            }
          }
          setIsLoading(false)
        }
       
       function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>){
        if(event.key === 'Enter'){
          handleSubmit(handleAddMusic)()
        }
       }
           Amplitude.pause()
       
    return(
         <>
         {returnToPlaylist === false ? 
           <Container>
           <PlusCircleButton onClick={()=>{setReturnToPlaylist(true)}}><ArrowUUpLeft size={40} color="#000000" weight="fill"/></PlusCircleButton>
           <SpaceToAddMusic>
                 <Title>
                  Adicione através de um aqruivo mp3
                  <MusicNotes size={40} color="#000000" weight="fill"/>
                 </Title>
                  <InputContainer>
                  <Label>
                    <p>Enviar arquivo mp3</p>
                  <InputFile 
                  type="file"
                  {...register('musicUrl')}
                  onKeyDown={(event)=>{handleKeyPress(event)}}
                  />
                  </Label>
                  {errors.musicUrl && <ErrorMessage>{errors.musicUrl.message}</ErrorMessage> }
                  {isLoading && <LoadingMessage>Carregando...</LoadingMessage> }
                  </InputContainer>
           </SpaceToAddMusic>
         </Container>
         : Musics.length === 0 ? <PlaylistEmptyAlert/> : <MusicTrack/>}
         </>
    )
}
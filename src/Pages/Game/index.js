import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

import colors from '../../globalStyle';
import styles from './styles';

export default function Game() {
   const [rock, setRock] = useState(false);
   const [paper, setPapper] = useState(false);
   const [scissors, setScissors] = useState(false);
   const [loadingMessage, setLoadingMessage] = useState('');
   const [showButton, setShowButton] = useState(true);
   const [optionComputer, setOptionComputer] = useState(''); 
   const [optionPlayer, setOptionPlayer] = useState(''); 
   const [result, setResult] = useState('');
   const [showResults, setShowResults] = useState(false);
   const [wins, setWins] = useState(0);
   const [loses, setLoses] = useState(0);
   const [draws, setDraws] = useState(0);
   const [win, setWin] = useState(true);
   const [lose, setLose] = useState(true);
   const [draw, setDraw] = useState(true);

   const options = ['PEDRA', 'PAPEL', 'TESOURA'];

   function selectPaper() {
      setScissors(false);
      setPapper(true);
      setRock(false);
      setLoadingMessage('');
   }

   function selectRock() {
      setScissors(false);
      setPapper(false);
      setRock(true);
      setLoadingMessage('');
   }

   function selectScissors() {
      setScissors(true);
      setPapper(false);
      setRock(false);
      setLoadingMessage('');
   }

   function resetWinLoseAndDraw() {
      setLose(false);
      setDraw(false);
      setWin(false);
   }

   function playGame() {
      setShowResults(false);
      setLoadingMessage('Carregando...');
      setShowButton(false);
      const computer = Math.floor(Math.random() * options.length);
      setOptionComputer(options[computer]);

      if(!rock && !paper && !scissors) {
         setTimeout(() => {
            setShowButton(true);
            setLoadingMessage('Por favor selecione uma opção');
         }, 2000);

         return;
      }

      if(rock) setOptionPlayer('PEDRA');
      if(paper) setOptionPlayer('PAPEL');
      if(scissors) setOptionPlayer('TESOURA');
      
      setTimeout(() => {
         switch(options[computer]) {
            case 'PEDRA':
               if(rock) {
                  setResult('EMPATE');
                  setDraws(draws + 1);
                  resetWinLoseAndDraw();
                  setDraw(true);
               }
               if(paper) {
                  setResult('VOCÊ VENCEU');
                  setWins(wins + 1);
                  resetWinLoseAndDraw();
                  setWin(true);
               }
               if(scissors) {
                  setResult('COMPUTADOR VENCEU');
                  setLoses(loses + 1);
                  resetWinLoseAndDraw();
                  setLose(true);
               }
               break;
            case 'PAPEL':
               if(rock) {
                  setResult('COMPUTADOR VENCEU');
                  setLoses(loses + 1);
                  resetWinLoseAndDraw();
                  setLose(true);
               }
               if(paper) {
                  setResult('EMPATE');
                  setDraws(draws + 1); 
                  resetWinLoseAndDraw();
                  setDraw(true); 
               }
               if(scissors) {
                  setResult('VOCÊ VENCEU');
                  setWins(wins + 1);
                  resetWinLoseAndDraw();
                  setWin(true);
               }
               break;
            case 'TESOURA':
               if(rock) { 
                  setResult('VOCÊ VENCEU');
                  setWins(wins + 1);
                  resetWinLoseAndDraw();
                  setWin(true);
               }
               if(paper) {
                  setResult('COMPUTADOR VENCEU');
                  setLoses(loses + 1);
                  resetWinLoseAndDraw();
                  setLose(true);
               }
               if(scissors) {
                  setResult('EMPATE');
                  setDraws(draws + 1);
                  resetWinLoseAndDraw();
                  setDraw(true);
               }
               break;
         }
         setLoadingMessage('');
         setShowButton(true);
         setShowResults(true);
      }, 1000);
   }

   return(
      <View style={styles.container}>
         <View style={styles.header}>
            <Text style={styles.textHeader}>Pedra, Papel e Tesoura</Text>
         </View>
         <ScrollView>
            <View style={styles.content}>
               <View style={styles.options}>
                  <TouchableWithoutFeedback
                     onPress={selectRock}
                  >
                     <FontAwesome 
                        size={50}
                        name="hand-rock-o"
                        style={rock && styles.active}
                        color={colors.textColor}

                     />
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                     onPress={selectPaper}
                     
                  >
                     <FontAwesome 
                        size={50}
                        name="hand-paper-o"
                        style={paper && styles.active}
                        color={colors.textColor}
                     />
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                     onPress={selectScissors}

                  >
                     <FontAwesome 
                        size={50}
                        name="hand-scissors-o"
                        style={scissors && styles.active}
                        color={colors.textColor}
                     />
                  </TouchableWithoutFeedback>
               </View>
               <View style={styles.play}>
                  <Text style={styles.loading}>{loadingMessage}</Text>

                 {showButton && (
                     <RectButton style={styles.button}
                        onPress={playGame}
                     >
                        <Text style={styles.buttonText}>Jogar</Text>
                     </RectButton>
                 )}
               </View>

               {showResults && (
                  <View style={styles.results}>
                     <Text style={[
                        styles.textResult,
                        win && styles.win,
                        lose && styles.lose,
                        draw && styles.draw
                     ]}>
                        {result} !
                     </Text>
                     <Text style={styles.textResult}>
                        O computador escolheu <Text style={styles.primaryColor}>{optionComputer}</Text>
                     </Text>
                     <Text style={styles.textResult}>
                        Você escolheu <Text style={styles.primaryColor}>{optionPlayer}</Text>
                     </Text>
                  </View>

               )}
               <View style={styles.score}>
                  <View style={styles.table}>
                     <Text style={[styles.row, styles.win]}>
                        Vitórias: <Text style={styles.scorePoints}>{wins}</Text>
                     </Text>
                     <Text style={[styles.row, styles.lose]}>
                        Derrotas: <Text style={styles.scorePoints}>{loses}</Text>
                     </Text>
                     <Text style={[styles.row, styles.draw]}>
                        Empates: <Text style={styles.scorePoints}>{draws}</Text>
                     </Text>
                  </View>
               </View>
            </View>
         </ScrollView>
      </View>
   );
}
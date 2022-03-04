# game-klondike.0.0.dataLanguages
Universo Santa Tecla  
[uSantaTecla@gmail.com](mailto:uSantaTecla@gmail.com)  
  
## requirements 

~~~~
- name: start
  player: Maria Antoñeta
  table:
    stock:
      num_cards: '24'
    waste:
      num_cardas: '0'
    foundations:
    - num_cards: '0'
      suit: heart
    - num_cards: '0'
      suit: spade
    - num_cards: '0'
      suit: diamon
    - num_cards: '0'
      suit: club
    tableaus:
    - - num_cards: '0'
        state: facedown
      - num_cards: '1'
        state: faceup
    - - num_cards: '1'
        state: facedown
      - num_cards: '1'
        state: faceup
    - - num_cards: '2'
        state: facedown
      - num_cards: '1'
        state: faceup
    - - num_cards: '3'
        state: facedown
      - num_cards: '1'
        state: faceup
    - - num_cards: '4'
        state: facedown
      - num_cards: '1'
        state: faceup
    - - num_cards: '5'
        state: facedown
      - num_cards: '1'
        state: faceup
    - - num_cards: '6'
        state: facedown
      - num_cards: '1'
        state: faceup
- name: playing
  move:
  - origin: stock
    card:
      position: top
      num_cards: '1'
      faceup: 'false'
    destination:
    - waste
    - foundation
    - tableau
  - origin: waste
    card:
      position: top
      num_cards: '1'
      faceup: 'true'
    destination:
    - foundation
    - tableau
  - origin: waste
    card:
      position: top
      num_cards: all
      faceup: 'true'
    destination:
      description: receive cards facedown
      "#text": stock
  - origin: tableau
    card:
      position: top
      num_cards: '1'
      faceup: 'true'
    destination:
    - foundation
    - tableau
  - origin: tableau
    card:
      position: top
      num_cards: n
      faceup: 'true'
      description: black over red or red over black
    destination: tableau
  - origin: foundation
    card:
      position: top
      num_cards: '1'
      faceup: 'true'
    destination: tableau
- name: win_game
  table:
    stock:
      num_cards: '0'
    waste:
      num_cards: '0'
    foundations:
    - num_cards: '13'
      suit: heart
    - num_cards: '13'
      suit: spade
    - num_cards: '13'
      suit: diamon
    - num_cards: '13'
      suit: club
    tableaus:
    - cards:
        num_cards: '0'
    - cards:
        num_cards: '0'
    - cards:
        num_cards: '0'
    - cards:
        num_cards: '0'
    - cards:
        num_cards: '0'
    - cards:
        num_cards: '0'
    - cards:
        num_cards: '0'
~~~~


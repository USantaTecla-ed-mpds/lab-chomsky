<p align="center">
  <img src="https://github.com/USantaTecla-ed-mpds/lab-chomsky/blob/master/tech-js-basado-objetos/mastermind/MasterMind-UML.png">
</p>

```
@startuml
Mastermind ..> YesNoDialog
Mastermind ..> Game
Game ..> Console
YesNoDialog ..> Console
Game *-- Board
Game --> GameSettings
GameSettings : COLORS
GameSettings : MAX_ATTEMPTS
GameSettings : COMBINATION_LENGTH
Board --> GameSettings
Board *-- SecretCombination
Board o-> "0..10" ProposalCombination
Board ..> "0..10"Result
Game ..> ProposalCombination
SecretCombination *--> Combination
SecretCombination ..> Result
ProposalCombination *--> Combination
Combination *-- "1..n" Colors
enum Colors {
  RED
  BLUE
  YELLOW
  GREEN
  PURPLE
  ORANGE
}
Board ..> Console
Combination ..> Console
Combination --> GameSettings
Result ..> Console
@enduml

@enduml
```

<p align="center">
  <img src="https://github.com/USantaTecla-ed-mpds/lab-chomsky/blob/master/tech-js-basado-objetos/mastermind/sin-vistas-separadas/MasterMind-UML.png">
</p>

```
@startuml
Mastermind ..> YesNoDialog
Mastermind ..> Game
Game *-- SecretCombination
Game o-> "0..10" ProposalCombination
Game ..> "0..10" Result
Game : MAX_ATTEMPTS
SecretCombination ..> ProposalCombination
SecretCombination *--> Combination
SecretCombination ..> Result
ProposalCombination *--> Combination
Combination : COLORS
Combination : COMBINATION_LENGTH
Combination *-- "1..n" Colors
enum Colors {
  RED
  BLUE
  YELLOW
  GREEN
  CYAN
  MAGENTA
}
@enduml
```

# game-klondike.0.0.dataLanguages
Universo Santa Tecla  
[uSantaTecla@gmail.com](mailto:uSantaTecla@gmail.com)  
  
## requirements 
~~~~
<Klondike>
    <state name="start">
        <player>Maria Antoñeta</player>
        <table>
            <stock num_cards="24"></stock>
            <waste num_cards="0"></waste>
            <foundations>
                <foundation num_cards="0" suit="heart"></foundation>
                <foundation num_cards="0" suit="spade"></foundation>
                <foundation num_cards="0" suit="diamon"></foundation>
                <foundation num_cards="0" suit="club"></foundation>
            </foundations>
            <tableaus>
                <tableau>
                    <cards num_cards="0" state="facedown"></cards>
                    <cards num_cards="1" state="faceup"></cards>
                </tableau>
                <tableau>
                    <cards num_cards="1" state="facedown"></cards>
                    <cards num_cards="1" state="faceup"></cards>
                </tableau>
                <tableau>
                    <cards num_cards="2" state="facedown"></cards>
                    <cards num_cards="1" state="faceup"></cards>
                </tableau>
                <tableau>
                    <cards num_cards="3" state="facedown"></cards>
                    <cards num_cards="1" state="faceup"></cards>
                </tableau>
                <tableau>
                    <cards num_cards="4" state="facedown"></cards>
                    <cards num_cards="1" state="faceup"></cards>
                </tableau>
                <tableau>
                    <cards num_cards="5" state="facedown"></cards>
                    <cards num_cards="1" state="faceup"></cards>
                </tableau>
                <tableau>
                    <cards num_cards="6" state="facedown"></cards>
                    <cards num_cards="1" state="faceup"></cards>
                </tableau>
            </tableaus>
        </table>
    </state>
    <state name="playing">
        <move>
            <origin>stock</origin>
            <card position="top" num_cards="1" faceup="false"></card>
            <destination>waste</destination>
            <destination>foundation</destination>
            <destination>tableau</destination>
        </move>
        <move>
            <origin>waste</origin>
            <card position="top" num_cards="1" faceup="true"></card>
            <destination>foundation</destination>
            <destination>tableau</destination>
        </move>
        <move>
            <origin>waste</origin>
            <card position="top" num_cards="all" faceup="true"></card>
            <destination description="receive cards facedown">stock</destination>
        </move>
        <move>
            <origin>tableau</origin>
            <card position="top" num_cards="1" faceup="true"></card>
            <destination>foundation</destination>
            <destination>tableau</destination>
        </move>
        <move>
            <origin>tableau</origin>
            <card position="top" num_cards="n" faceup="true" description="black over red or red over black"></card>
            <destination>tableau</destination>
        </move>
        <move>
            <origin>foundation</origin>
            <card position="top" num_cards="1" faceup="true"></card>
            <destination>tableau</destination>
        </move>
    </state>
    <state name="win_game">
        <table>
            <stock num_cards="0"></stock>
            <waste num_cards="0"></waste>
            <foundations>
                <foundation num_cards="13" suit="heart"></foundation>
                <foundation num_cards="13" suit="spade"></foundation>
                <foundation num_cards="13" suit="diamon"></foundation>
                <foundation num_cards="13" suit="club"></foundation>
            </foundations>
            <tableaus>
                <tableau>
                    <cards num_cards="0"></cards>
                </tableau>
                <tableau>
                    <cards num_cards="0"></cards>
                </tableau>
                <tableau>
                    <cards num_cards="0"></cards>
                </tableau>
                <tableau>
                    <cards num_cards="0"></cards>
                </tableau>
                <tableau>
                    <cards num_cards="0"></cards>
                </tableau>
                <tableau>
                    <cards num_cards="0"></cards>
                </tableau>
                <tableau>
                    <cards num_cards="0"></cards>
                </tableau>
            </tableaus>
        </table>
    </state>
</Klondike>
~~~~
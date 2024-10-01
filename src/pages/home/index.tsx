import { Play } from "phosphor-react";
import {
    CoutDownContainer,
    FormContainer,
    HomeContainer,
    MinutesAmountInput,
    Separator,
    StartCountDownButton,
    TaskInput
} from "./styles";

export function Home() {
    return (
        <HomeContainer>
            <form action="">
                <FormContainer >
                    <label htmlFor="task">Vou trabalhar em </label>
                    <TaskInput
                        id="task"
                        list="task-suggestions"
                        placeholder="Dê um nome para o seu projeto"
                    />

                    <datalist id="task-suggestions">
                        <option value="optiion 1"></option>
                    </datalist>

                    <label htmlFor="minutesAmout">Durante </label>
                    <MinutesAmountInput
                        type="number"
                        id="minutesAmout"
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}

                    />

                    <span>minutos</span>

                    <CoutDownContainer>
                        <span>0</span>
                        <span>0</span>
                        <Separator>:</Separator>
                        <span>0</span>
                        <span>0</span>
                    </CoutDownContainer>


                </FormContainer>
                <StartCountDownButton disabled type="submit">
                    <p>
                        <Play size={24} />
                        Começar
                    </p>
                </StartCountDownButton>

            </form>
        </HomeContainer>
    )
}
import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { newCycleProps } from "../../dtos/newCycle.dto";
import {
  CoutDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from "./styles";
import { useState } from "react";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minuteAmount: zod
    .number()
    .min(5, "o ciclo precisa ser de no minimo 5 minutos")
    .max(60, "o ciclo precisa ser de no maximo 60 minutos"),
});



export function Home() {
  const [cycle, setCycle] = useState<newCycleProps[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const { register, handleSubmit, watch, reset } = useForm<newCycleProps>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      id: "",
      task: "",
      minuteAmount: 0,
    },
  });

  function handleCreateNewCicle(data: newCycleProps) {
    const id = String(new Date().getTime());
    const newCycle = {
      id: id,
      task: data.task,
      minuteAmount: data.minuteAmount
    }
    setCycle((state) => [...state, newCycle]);
    setActiveCycleId(id)

    reset();
  }
  const activeCycle = cycle.find(activeCycle => activeCycle.id === activeCycleId);
  console.log(activeCycle)

  const totalSeconds = activeCycle ? activeCycle.minuteAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed: 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minute = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  const task = watch("task");
  const isSubmitDisabled = !task;
  

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCicle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em </label>
          <TaskInput
            type="text"
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register("task")}
          />

          <datalist id="task-suggestions">
            <option value="optiion 1"></option>
          </datalist>

          <label htmlFor="minuteAmount">Durante </label>
          <MinutesAmountInput
            type="number"
            id="minuteAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register("minuteAmount", { valueAsNumber: true })}
          />

          <span>minutos</span>

          <CoutDownContainer>
            <span>{minute[0]}</span>
            <span>{minute[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
          </CoutDownContainer>
        </FormContainer>
        <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
          <p>
            <Play size={24} />
            Começar
          </p>
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
}

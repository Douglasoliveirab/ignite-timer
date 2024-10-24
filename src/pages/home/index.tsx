import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { differenceInSeconds } from "date-fns";
import { newCycleProps } from "../../dtos/newCycle.dto";
import {
  CoutDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  StopCountDownButton,
  TaskInput,
} from "./styles";
import { useEffect, useState } from "react";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minuteAmount: zod
    .number()
    .min(1, "o ciclo precisa ser de no minimo 5 minutos")
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
      minuteAmount: data.minuteAmount,
      startDate: new Date(),
    }
    setCycle((state) => [...state, newCycle]);
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset();
  }
  const activeCycle = cycle.find(activeCycle => activeCycle.id === activeCycleId);

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
      return () => {

        clearInterval(
          interval
        )
      }
    }
  }, [activeCycle]);

  function handleInterruptCycle() {
    setCycle(cycle.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, interruptedDate: new Date() }
      } else {
        return cycle
      }
    }))
    setActiveCycleId(null);
    document.title = 'Ignite-timer-ts';
  }

  const totalSeconds = activeCycle ? activeCycle.minuteAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minute = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    if (activeCycleId) {
      document.title = `${minute}:${seconds}`;
    }
  }, [minute, seconds, activeCycle]);

  const task = watch("task");
  const isSubmitDisabled = !task;

 console.log(cycle)
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCicle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em </label>
          <TaskInput
            type="text"
            id="task"
            disabled={!!activeCycle}
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
            disabled={!!activeCycle}
            placeholder="00"
            step={5}
            min={1}
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
        {activeCycle ? (
          <StopCountDownButton onClick={handleInterruptCycle} type="button">
            <p>
              <HandPalm size={24} />
              Interromper
            </p>
          </StopCountDownButton>
        ) : (

          <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
            <p>
              <Play size={24} />
              Começar
            </p>
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}

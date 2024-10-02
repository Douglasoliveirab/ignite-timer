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

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minuteAmount: zod
    .number()
    .min(5, "o ciclo precisa ser de no minimo 5 minutos")
    .max(60, "o ciclo precisa ser de no maximo 60 minutos"),
});

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<newCycleProps>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minuteAmount: 0,
    },
  });

  function handleCreateNewCicle(data: newCycleProps) {
    console.log(data);
    reset();
  }

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
            <span>0</span>
            <span>0</span>
            <Separator>:</Separator>
            <span>0</span>
            <span>0</span>
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

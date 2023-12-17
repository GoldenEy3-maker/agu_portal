import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { BiLockAlt, BiUser } from "react-icons/bi"
import Button from "~/components/Button"
import Checkbox from "~/components/Checkbox"
import * as Form from "~/components/Form"
import Input from "~/components/Input"
import * as Modal from "~/components/Modal"
import { useAutoFocus } from "~/hooks/autoFocus.hook"
import {
  AuthSignInInput,
  authSignInInput,
} from "~/server/api/schemas/auth.schema"
import { useModalStore } from "~/store/modal"
import { useSessionStore } from "~/store/session"
import { api } from "~/utils/api"
import { ModalKeyMap } from "~/utils/enums"

const SignInModal: React.FC = () => {
  const modalStore = useModalStore()
  const sessionStore = useSessionStore()

  const loginInputRef = useRef<HTMLInputElement>(null)
  const isModalOpen = modalStore.queue.at(-1) === ModalKeyMap.SignIn

  const closeModalHandler = () => modalStore.close()

  const signIn = api.auth.signIn.useMutation({
    onSuccess(data) {
      toast.success("Вы успешно авторизировались!")
      sessionStore.setToken(data.accessToken)
      sessionStore.setUser(data.user)
      closeModalHandler()
      form.reset()
    },
    onError(error) {
      console.error("🚀 ~ file: index.tsx:39 ~ onError ~ error:", error)
      toast.error(error.message)
      loginInputRef.current?.focus()
    },
  })

  const form = useForm<AuthSignInInput>({
    defaultValues: {
      login: "",
      password: "",
      rememberMe: false,
    },
    resolver: zodResolver(authSignInInput),
  })

  const submitFormHandler = form.handleSubmit((data) => {
    signIn.mutate(data)
  })

  useAutoFocus(loginInputRef, isModalOpen)

  return (
    <Modal.Root state={isModalOpen}>
      <Modal.Header>
        <Modal.Title>Войти</Modal.Title>
        <Modal.Close onClick={closeModalHandler} />
      </Modal.Header>
      <Modal.Content>
        <Form.Root id="sign-in-form" onSubmit={submitFormHandler}>
          <Form.Fieldset>
            <Controller
              control={form.control}
              name="login"
              render={({ field }) => (
                <Input
                  type="text"
                  label="Логин"
                  id="login"
                  placeholder="ivanov.202s2"
                  name={field.name}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  ref={loginInputRef}
                  leadingIcon={<BiUser />}
                  errorMessage={form.formState.errors.login?.message}
                  disabled={signIn.isLoading}
                />
              )}
            />
            <Controller
              control={form.control}
              name="password"
              render={({ field }) => (
                <Input
                  type="password"
                  label="Пароль"
                  id="password"
                  placeholder="******"
                  name={field.name}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  leadingIcon={<BiLockAlt />}
                  errorMessage={form.formState.errors.password?.message}
                  disabled={signIn.isLoading}
                />
              )}
            />
          </Form.Fieldset>
          <Form.Fieldset type="checkbox">
            <Controller
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <Checkbox
                  type="check"
                  id="rememberMe"
                  label="Запомнить меня"
                  name={field.name}
                  checked={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled={signIn.isLoading}
                />
              )}
            />
          </Form.Fieldset>
          <Link
            href="#"
            onClick={(event) => {
              event.preventDefault()
              modalStore.open({
                key: ModalKeyMap.SignOut,
                target: event.currentTarget,
              })
            }}
          >
            Забыли логин или пароль?
          </Link>
        </Form.Root>
      </Modal.Content>
      <Modal.Footer>
        <Button
          type="button"
          onClick={closeModalHandler}
          disabled={signIn.isLoading}
        >
          Отменить
        </Button>
        <Button
          type="submit"
          form="sign-in-form"
          variant="filled"
          disabled={signIn.isLoading}
        >
          Войти
        </Button>
      </Modal.Footer>
    </Modal.Root>
  )
}

export default SignInModal

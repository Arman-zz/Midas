export default function LoginForm({ hidden = false, onSubmit }) {
  return <form hidden={hidden} onSubmit={onSubmit}><input name="email" type="email" required /><input name="password" type="password" required /><button type="submit">Log in</button></form>
}

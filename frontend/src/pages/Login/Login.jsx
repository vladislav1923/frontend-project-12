import {Field, Form, Formik} from "formik";

function Login() {
    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={({ setSubmitting }) => {
                console.log("Form is validated! Submitting the form...");
                setSubmitting(false);
            }}
        >
            {() => (
                <Form>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field
                            type="text"
                            name="username"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Field
                            type="password"
                            name="password"
                        />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default Login;

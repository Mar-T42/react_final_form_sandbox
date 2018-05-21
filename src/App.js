import React from 'react'
import { Form, Field } from 'react-final-form'
import 'core-js/es6/promise';
import 'core-js/es6/set';
import 'core-js/es6/map';
import { setIn } from 'final-form';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
};

const validate = async (values, schema) => {
    console.log(values);
    if (typeof schema === 'function') {
        schema = schema();
    }

    try {
        await schema.validate(values, { abortEarly: false });
    } catch (e) {
        console.log(e);
        return e.inner.reduce((errors, error) => {
            return setIn(errors, error.path, error.message);
        }, {});
    }

};

const yup = require('yup');

const formValidationSchema = yup.object().shape({
    firstName:      yup.string().required().min(3),
    lastName:       yup.string().required().min(3),
    email:     yup.string().email(),
});

const App = () => (
    <div>
        <h1>React Final Form & Yup - Playground</h1>
        <a href="https://github.com/erikras/react-final-form#-react-final-form">
            Read Docs
        </a>
        <Form // Een React final form
            onSubmit={onSubmit}
            validate={values => validate(values, formValidationSchema)}
            initialValues={{ employed: true, stooge: 'larry' }}
            render={({ handleSubmit, reset, submitting, pristine, values }) => (
                //De props die door Form (en FormState) meegegeven worden aan render
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>First Name</label>
                        <Field
                            name="firstName"
                            component="input"
                            type="text"
                            placeholder="First Name"
                        />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <Field
                            name="lastName"
                            component="input"
                            type="text"
                            placeholder="Last Name"
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <Field
                            name="email"
                            component="input"
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <label>Favorite Color</label>
                        <Field name="favoriteColor" component="select">
                            <option />
                            <option value="#ff0000">Red</option>
                            <option value="#00ff00">Green</option>
                            <option value="#0000ff">Blue</option>
                        </Field>
                    </div>
                    <div>
                        <label>Employed?</label>
                        <Field name="employed" component="input" type="checkbox" />
                    </div>
                    <div>
                        <label>Toppings</label>
                        <Field name="toppings" component="select" multiple>
                            <option value="ham">Ham</option>
                            <option value="mushrooms">Mushrooms</option>
                            <option value="cheese">Cheese</option>
                            <option value="chicken">Chicken</option>
                            <option value="pineapple">Pinapple</option>
                        </Field>
                    </div>
                    <div>
                        <label>Best Stooge?</label>
                        <div>
                            <label>
                                <Field
                                    name="stooge"
                                    component="input"
                                    type="radio"
                                    value="larry"
                                />{' '}
                                Larry
                            </label>
                            <label>
                                <Field
                                    name="stooge"
                                    component="input"
                                    type="radio"
                                    value="moe"
                                />{' '}
                                Moe
                            </label>
                            <label>
                                <Field
                                    name="stooge"
                                    component="input"
                                    type="radio"
                                    value="curly"
                                />{' '}
                                Curly
                            </label>
                        </div>
                    </div>
                    <div>
                        <label>Sauces</label>
                        <div>
                            <label>
                                <Field
                                    name="sauces"
                                    component="input"
                                    type="checkbox"
                                    value="ketchup"
                                />{' '}
                                Ketchup
                            </label>
                            <label>
                                <Field
                                    name="sauces"
                                    component="input"
                                    type="checkbox"
                                    value="mustard"
                                />{' '}
                                Mustard
                            </label>
                            <label>
                                <Field
                                    name="sauces"
                                    component="input"
                                    type="checkbox"
                                    value="salsa"
                                />{' '}
                                Salsa
                            </label>
                            <label>
                                <Field
                                    name="sauces"
                                    component="input"
                                    type="checkbox"
                                    value="guacamole"
                                />{' '}
                                Guacamole
                            </label>
                        </div>
                    </div>
                    <div>
                        <label>Notes</label>
                        <Field name="notes" component="textarea" placeholder="Notes" />
                    </div>
                    <div className="buttons">
                        <button type="submit" disabled={submitting || pristine}>
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={reset}
                            disabled={submitting || pristine}>
                            Reset
                        </button>
                    </div>
                    <pre>
                        <fieldset>
                            <legend>State (values):</legend>
                            {JSON.stringify(values, 0, 2)}
                        </fieldset>
                    </pre>
                </form>
            )}
        />
    </div>
);

export default App;

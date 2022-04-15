import React, { useReducer,useEffect, useState} from 'react'
import { User } from '../api/types'
import {getAllUser,createUser,updateUser,deleteUser} from '../api/user'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Field from '../private/Field'


type FormEvent =
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>

type FormData = { name: string; value: string | number | undefined }

const formReducer = (state: User | User, event: FormData) => {
    return {
        ...state,
        [event.name]: event.value,
    }
}

const AllUsers = () => {

    const [author, setAuthor] = useState<Array<User>>([])
    const [formData, setFormData] = useReducer(
        formReducer,
        {} as User | User
    )
    let { id } = useParams() // post id from url
    const navigate = useNavigate() // create a navigate function instance



    async function _getAlluser() {
        const data = await getAllUser()
        setAuthor(data)
    }

    useEffect(() => {
        _getAlluser();
      }, []);
    
      async function handleAddOrCreateUser(
        event: React.FormEvent<HTMLFormElement>
    ) {
        console.log(formData)
        // remove default reloading page
        event.preventDefault()

        if (id) {
            await updateUser(formData as User)
        } else {
            await createUser(formData)
        }

        // back to Home
        navigate('/')
    }

    async function handleDeleteUser() {
        await deleteUser(Number(id))
        // back to Home
        navigate('/')
    }

    function handleChange(event: FormEvent) {
        //
        const value =
            event.target.name === 'userId'
                ? Number(event.target.value)
                : event.target.value
        setFormData({
            name: event.target.name,
            value,
        })
    }

    function RenderAuthor (values: User) {
        return (
            author && (
                    <div className="Users-list-wrapper">
                        <Field label="Name">
                            <span>{values.name}</span>
                        </Field>
                        <Field label="Email">
                            <span>{values.email}</span>
                        </Field>
                        <Field label="Company">
                            <span>{values.company.name}</span>
                        </Field>
                        <Field label="Phone">
                            <span>{values.phone}</span>
                        </Field>
                        <Field label="Address">
                            <span>{values.address.street} - </span>
                            <span>{values.address.city} - </span>
                            <span>{values.address.zipcode}</span>
                        </Field>
                    </div>
            )
        )
    }

    return (
        <>  
            <ul className="post-list">{author.map(RenderAuthor)}</ul>
            <form className="user-form" onSubmit={handleAddOrCreateUser}>
                <Field label="Nom">
                    <input
                        onBlur={handleChange}
                        name="name"
                        className="input"
                        type="text"
                        placeholder="Text input"
                        value={formData.name}
                    />
                </Field>
                <Field label="email">
                    <input
                        onBlur={handleChange}
                        name="email"
                        className="input"
                        type="text"
                        placeholder="Text input"
                        value={formData.email}
                    />
                </Field>
                {!!id && (
                    <Field label="Extra actions">
                        <button
                            type="button"
                            className="button is-warning"
                            onClick={handleDeleteUser}
                        >
                            Delete User
                        </button>
                    </Field>
                )}
                <div className="field is-grouped is-grouped-centered">
                    <p className="control">
                        <button type="submit" className="button is-primary"
                        >                          
                            Submit
                        </button>
                    </p>
                    <p className="control">
                        <Link to="/" className="button is-light">
                            Cancel
                        </Link>
                    </p>
                </div>
            </form>
        </>
    )

// Bon on a un petit soucis :
// apres la creation d'un utilisateur, tant que cet utilisateur est dans la DB, la page all users devient page blanche


}

export default AllUsers

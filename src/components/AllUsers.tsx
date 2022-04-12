import React from 'react'
import { getAllUser } from '../api/user'
import {useEffect, useState} from 'react'
import {User} from '../api/types'
import Field from '../private/Field'


const AllUsers = () => {

    const [author, setAuthor] = useState<Array<User>>([])

    async function _getAlluser() {
        const data = await getAllUser()
        setAuthor(data)
    }

    useEffect(() => {
        _getAlluser();
      }, []);
    
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

return <ul className="post-list">{author.map(RenderAuthor)}</ul>

}

export default AllUsers

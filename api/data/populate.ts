import mongoose from "mongoose";

import { User, Song } from '.'

mongoose.connect('mongodb://localhost:27017/baffle')
    .then(() => User.deleteMany())
    .then(() => Song.deleteMany())
    .then(() => User.create({ name: 'Miky Seu', email: 'miky@seu.com', username: 'Miky', password: '123qwe123' }))
    .then(user =>
        Promise.all([

            Song.create({ user: user._id, title: 'Marching to Success', sunoId: '4815c59a-56ad-4870-92c2-8a4713d8da88' }),
            Song.create({ user: user._id, title: 'afro-jazz verdean', sunoId: '512ff9f2-3990-4005-b410-5f56a81eea45' }),
            Song.create({ user: user._id, title: 'ambient house 16-bit', sunoId: 'fe2e6d06-1dd5-4458-8426-6cb742fce01c' }),
            Song.create({ user: user._id, title: 'arabic reggae', sunoId: '06221f5c-c70d-45c5-9e77-6c193e526e30' }),
            Song.create({ user: user._id, title: 'rock', sunoId: 'c83f7634-ccc0-4289-a923-3178de7f467f' }),
            Song.create({ user: user._id, title: 'electro-jungle', sunoId: 'cc57128a-6514-44c2-8c48-3448378f3341' }),
            Song.create({ user: user._id, title: 'hindi southern rock', sunoId: 'ca2ec564-c597-4675-adae-a19a06e23c1d' }),
            Song.create({ user: user._id, title: 'portuguese breakbeat', sunoId: '605c2d39-f5ca-4408-897f-e706191a1f4e' }),
            Song.create({ user: user._id, title: 'korean pacific reggae', sunoId: '98fac0ad-d18e-437e-b132-2247d7693886' }),
            Song.create({ user: user._id, title: 'surf flamenco', sunoId: 'dcb65390-4c26-42cb-8788-13eb2b7684a7' }),
            Song.create({ user: user._id, title: 'instrumental bluegrass', sunoId: '977d1052-2e3f-460d-89da-6dd2f8c6758c' }),
            Song.create({ user: user._id, title: 'cajun griot', sunoId: 'c5637ef5-c9d6-44ea-919b-1aa35bf1c18c' }),
            Song.create({ user: user._id, title: 'choral celtic', sunoId: 'a5472e36-b177-42e2-b67a-d2876cce9120' }),
            Song.create({ user: user._id, title: 'dakar afro-cuban jazz', sunoId: '1cc1da66-1b48-4277-a658-28a77e13059d' }),
            Song.create({ user: user._id, title: 'hypnagogic pacific reggae', sunoId: '62fad402-04f1-4832-a6cd-6df2afa0a248' }),
            Song.create({ user: user._id, title: 'koto gnawa', sunoId: 'd06eb9d8-1a1c-4327-88f2-bc8e8bab7398' }),
            Song.create({ user: user._id, title: 'new orleans grunge', sunoId: 'f51c748b-3e5f-4c38-b455-6e406cba29c0' }),
            Song.create({ user: user._id, title: 'prog avant-garde jazz', sunoId: 'e5f63e6b-3e3e-492d-b515-615962da15fa' }),
            Song.create({ user: user._id, title: 'dark goa trance', sunoId: '94ef9440-4757-4ed6-8595-59f6c5b8adf8' }),
            Song.create({ user: user._id, title: 'dreamy swing', sunoId: 'd23550cc-fcf6-4868-8204-6f9616e09fd7' }),
        ])

    )

    .then(() => mongoose.disconnect())
    .then(() => console.log('populated'))
    .catch(console.error)

import React, { useEffect, useState } from 'react'

import { StreamChat } from 'stream-chat'
import {
    Chat,
    Channel,
    Window,
    ChannelHeader,
    MessageList,
    MessageInput,
    LoadingIndicator,
    Thread,
    ChannelList
} from 'stream-chat-react'

import 'stream-chat-react/dist/css/index.css'

const apiKey = process.env.REACT_APP_stream_key;

const user = {
    id: 'john',
    name: 'john',
    image: 'https://theme.zdassets.com/theme_assets/9442057/efc3820e436f9150bc8cf34267fff4df052a1f9c.png',
}

const filters = { type: 'messaging', members: { $in: [user.id] } }
const sort = { last_message_at: -1 }

const Message = () => {
    const [client, setClient] = useState(null)
    // const [channel, setChannel] = useState(null)

    useEffect(() => {
        async function init() {
            const chatClient = StreamChat.getInstance(apiKey)

            await chatClient.connectUser(user, chatClient.devToken(user.id))

            const channel = chatClient.channel('messaging', 'react-talk', {
                image: 'https://theme.zdassets.com/theme_assets/9442057/efc3820e436f9150bc8cf34267fff4df052a1f9c.png',
                name: 'Din Chatting Zone',
                members: [user.id]
            })

            await channel.watch()

            // setChannel(channel)
            setClient(chatClient)
        }
        init()

        if (client) return () => client.disconnectUser()
    }, [client])

    if (!client) return <LoadingIndicator />

    return (
        <Chat client={client} theme="messaging light">
            <ChannelList
                filters={filters}
                sorts={sort}
            />
            <Channel>
                <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                </Window>
                <Thread />
            </Channel>
        </Chat>
    )
};

export default Message;
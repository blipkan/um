import {SortOrder} from '../constants'

const INITIAL_STATE = {
    userlist: {
        isFetching: false,
        selectedId: 1,
        items: [],
        query: "",
        sort: {
            order: SortOrder.ASC,
            by: "id"
        },
        pager: {
            page: 1,
            size: 20,
            totalPages: 1,
            total: 20

        },
        messages: [/*{
            type: "success",
            code: 0,
            key: "msg.success",
            args: {}
        },
            {
                type: "danger",
                code: 0,
                key: "msg.error",
                args: {}
            }*/
        ]

    },
    usercard: {
        isFetching: true,
        isFormOpened: false,
        user: {},
        messages: []
    }

};

export default INITIAL_STATE
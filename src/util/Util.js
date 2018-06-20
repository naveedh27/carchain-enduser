//import axios from 'axios';

var user = {
    isAuthenticated: true,
    name: 'Naveedh',
    balance : 0,
    contact : '',
    email : '',
    async authenticate(cb) {

        let response;

        try {

            response = await fetch(endpoint.url + 'contactDetails/' + cb);

           

        } catch (err) {
            console.error(err);
        }


        if (response.status == '200') {

            this.isAuthenticated = true;
            this.name = cb;

            let userDetails = (await response.json());
            this.balance = userDetails.balance;
            this.contact = userDetails.Phone;
            this.email = userDetails.email;

            return true;
        }
        return false;
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100) // fake async
    }
};

var endpoint = {
    //url: "http://localhost:3010/api/"
    url: "http://ec2-13-232-8-72.ap-south-1.compute.amazonaws.com:3000/api/"
}


export default { user, endpoint };


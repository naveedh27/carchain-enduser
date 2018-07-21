//import axios from 'axios';

var user = {
    isAuthenticated: false,
    name: '',
    balance: 0,
    contact: '',
    email: '',
    vins: '',
    async authenticate(cb) {

        let response;

        try {

            response = await fetch(endpoint.url + 'contactDetails/' + cb);

            if (response.status == '200') {
                this.isAuthenticated = true;
                this.name = cb;
                let userDetails = (await response.json());
                this.balance = userDetails.balance;
                this.contact = userDetails.Phone;
                this.email = userDetails.emailId;

                return true;
            }

        } catch (err) {
            console.error(err);
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


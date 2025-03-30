const adminMaster = require('../models/admin').adminMaster;
const roomMaster = require('../models/room').roomMaster;
const inviteMaster = require('../models/invite_master').inviteMaster;

module.exports = {
    start_migration: function () {
        var admin_email = "admin@mache.com";
        var admin_password = "cb75f77555ebe683447c4fbc442312bc8caca497c6aafe03c55c06d4393b5b7c";
        var admin = { email_id: admin_email, password: admin_password, first_name: 'Master', last_name: "Admin", role: 1 };
        var invite = { is_delete: 1 }

        adminMaster.count()
            .then(count => {
                if (count > 0) {
                    return false;
                }
                else {
                    adminMaster.create(admin);
                }
            });
        roomMaster.count()
            .then(count => {
                if (count > 0) {
                    return false;
                }
                else {
                    roomMaster.create(invite);
                }
            });
        inviteMaster.count()
            .then(count => {
                if (count > 0) {
                    return false;
                }
                else {
                    inviteMaster.create(invite);
                }
            });

    }
};
import { createI18n } from 'vue-i18n';

const messages = {
    en: {
        home: {
            selectsales: 'Contact person',
            selectdate: 'Visit Date',
            participants: 'Participants',
            search: 'Search',
            appointment: 'Appointment',
            showModalnotnumber: 'Please specify the number of participants.',
            ok: 'OK',
            selectdepartment: 'Select Department',
            cancel: 'Cancel',
            confirm: 'Confirm',
            saleinformation: 'Sale information',
            select: 'select',
            showModaldepartmentnoselected: 'Please select a "department" before proceeding.',
            unable: 'Unable to continue!!!',
            saleschannels: 'saleschannels',
            callcenter: 'CALL CENTER',
            Selectdepartment: 'Select sales department',
            departmentname:'Department Name',
            numberofSales:'Number of Sales in the Department',
            selectd:'Select department',
            members: 'Members',
            information: 'Sales Information',
            


        },
        
        stepdata: {
            searchforsale: 'Search',
            searchforsale1: 'for Sale',
            searchappointment: 'Select',
            searchappointment1: 'Appointment',
            informationvisitors: 'Information ',
            informationvisitors1: 'visitors',
            confirmation: 'Confirmation',
        },

        buttomstepdata: {
            previous: 'Previous',
            nextstep: 'Next Step',

        },

        Toast: {
            successfullysaveddata: 'Data saved successfully',
            pleasefillinallfields: 'Please fill in all fields',
        },

        home2: {
            results: 'Results',
            selecttime: 'Select time',
            purposevisit: 'Purpose of visit',
            changesales: 'Change Sales',
            confirmtime: 'Confirm',
            selecttime1: 'Select Time',
            starttime: 'Start time',
            endtime: 'End time',
            showSelectTimeAlert:'Please press the "SELECT TIME" button to select a time and complete your appointment details.',
            ok:'OK',
            confirm: 'Confirm',
            Missingtime:'*The time that cannot be selected is the time that another person has already reserved. Please select a new time or change the date of your visit, or press the "Change Sales" button to select a different salesperson.*',
            estimatearrivaltime: 'Estimate arrival time',
            Selectdateand: 'Select date and time',
            SelectnewSales: 'Select new Sales',
            Departmentmembers: 'Department members'


        },
        home3: {
            appointmentdetails: 'Appointment details',
            department: 'Sales name',
            salesname: 'Department',
            position: 'Position',
            country: 'Country',
            date: 'Date',
            time: 'Time',
            participants: 'PARTICIPANTS',
            number: 'NUMBER',
            Participant: 'Participant',
            participant1: 'Participant',
            information: 'information',
            selecttype: 'Select Type',
            company: 'Company',
            individual: 'Individual',
            name: 'Name',
            selectstatus: 'Select Status',
            visitors: 'Visitors',
            customer: 'Customer',
            partner: 'Partner',
            other: 'Other',
            selectidentity: 'Select identity verification document',
            id: 'Thai ID',
            passport: 'Passport No.',
            namesurname: 'Name-Surname',
            firstname: 'First Name',
            lastname: 'Last Name',
            selectthejourney: 'Zelect jouney',
            companysevice: 'Arrange by Jinpao',
            carrentalcharter: 'self rental vehical',
            personalvehicle: 'Personal vehicle',
            carregistration: 'Carregistration',
            fillinadditionalinformation: 'Fill in additional information',
            email: 'E-mail',
            phonenumber: 'Telephone number',
            country1: 'Country',
            age: 'Age',
            next: 'Next',
        },

        showamodalhome3: {
            fill: 'Please fill in complete information. before going to the next step',
            ok: 'OK',
        },

        home4: {
            journey: ' Journey',
            salesname: 'SALES NAME',
            visitdata: 'VISIT DATE',
            visittime: 'VISITING TIME',
            purposeofvisit: 'PURPOSEOFVISIT',
            carregistration: 'Carregistration',
            status: 'Status',
            date: 'Date',
            time: 'Time',
            email: 'E-mail',
            phonenumber: 'Telephone number',
            country1: 'Country',
            age: 'Age',
            appointmentsummary:'Appointment Summary',
            participants: 'Participants',
            Press: 'Press',
            confirmyourbooking: 'Press the "Confirm" button to confirm your booking.',
            confirm: 'CONFIRM',
            open: 'OPEN',
            pleaseselect: 'Please tick to generate QR Code',
            thankyou: 'Thank You',
            bookingconfirmation: 'Please wait to receive a booking confirmation',
            registeredemail: 'letter via your registered email address.',
            contactus: 'If you have any questions, you can contact us at',
            or:'or',
            returnhomepage:'Return to home page',
            pleasepress: 'Please press',
            confirmyour: 'to confirm your booking.',
            ok: 'OK',
            completed: 'Completed',
            registeredemailaddress: 'Please wait to receive a booking confirmation letter via your registered email address.',





        },



    },
    th: {
        home: {
            selectsales: 'บุคคลที่ติดต่อ',
            selectdate: 'เยี่ยมชมวันที่',
            participants: 'ผู้เข้าร่วม',
            search: 'ค้นหา',
            appointment: 'การนัดหมาย',
            showModalnotnumber: 'กรุณาระบุจำนวนผู้เข้าร่วม',
            ok: 'ตกลง',
            selectdepartment: 'เลือกแผนก',
            cancel: 'ยกเลิก',
            confirm: 'ยืนยัน',
            saleinformation: 'ข้อมูลเซลล์',
            select: 'เลือก',
            showModaldepartmentnoselected: 'โปรดเลือก"แผนก"ก่อนดำเนินการต่อ',
            unable: 'ไม่สามารถดำเนินการต่อได้!!!',
            saleschannels: 'ช่องทางการขาย',
            callcenter: 'ศูนย์บริการ',
            Selectdepartment: 'เลือกแผนกเซลล์',
            departmentname:'ชื่อแผนก',
            numberofSales:'จำนวนเซลล์ในแผนก',
            selectd:'เลือกเเผนก',
            members: 'สมาชิก',
            information: 'ข้อมูลเซลล์',



        },

        stepdata: {
            searchforsale:'ค้นหา',
            searchforsale1:'เซลล์',
            searchappointment: 'เลือก',
            searchappointment1: 'การนัดหมาย',
            informationvisitors: 'ข้อมูล',
            informationvisitors1: 'ผู้เยี่ยมชม',
            confirmation: 'การยืนยัน',
        },
        buttomstepdata: {
            previous: 'ย้อนกลับ',
            nextstep: 'ขั้นตอนต่อไป',
        },
        Toast: {
            successfullysaveddata: 'บันทึกข้อมูลเรียบร้อยแล้ว',
            pleasefillinallfields: 'กรุณากรอกข้อมูลให้ครบทุกช่อง'
        },

        home2: {
            selecttime1: 'เลือกเวลา',
            results: 'ผลการค้นหา',
            selecttime: 'เลือกเวลา',
            purposevisit: 'วัตถุประสงค์ของการเยี่ยมชม',
            changesales: 'เปลี่ยนเซลล์',
            confirmtime: 'ยืนยัน',
            starttime: 'เวลาเริ่มต้น',
            endtime: 'เวลาสิ้นสุด',
            showSelectTimeAlert:'กรุณากดปุ่ม  "เลือกเวลา"  เพื่อเลือกเวลาและกรอกรายละเอียดการนัดหมายให้ครบถ้วน',
            ok:'ตกลง',
            confirm: 'ยืนยัน',
            Missingtime:'* ช่วงเวลาที่ไม่สามารถเลือกได้คือเวลาที่บุคคลอื่นจองไว้แล้ว โปรดเลือกเวลาใหม่หรือเปลี่ยนวันที่เข้าเยี่ยมชม หรือกดปุ่ม "เปลี่ยนเซลล์" เพื่อเลือกเซลล์ท่านอื่น *',
            estimatearrivaltime: 'ประมาณเวลาที่มาถึง',
            Selectdateand: 'เลือกวันที่และเวลา',
            SelectnewSales: 'เลือกเซลล์ใหม่',
            Departmentmembers: 'สมาชิกในแผนก'


        },

        home3: {
            appointmentdetails: 'รายละเอียดการนัดหมาย',
            department: 'แผนก',
            salesname: 'ชื่อเซลล์',
            position: 'ตำแหน่ง',
            country: 'ประเทศ',
            date: 'วันที่',
            time: 'เวลา',
            participants: 'จำนวน',
            number: 'ผู้เข้าร่วม',
            Participant: 'ผู้เข้าร่วมคนที่',
            participant1: 'ข้อมูล',
            information: 'ผู้เข้าร่วม',
            selecttype: 'เลือกประเภท',
            company: 'บริษัท',
            individual: 'รายบุคคล',
            name: 'ชื่อ',
            selectstatus: 'เลือกสถานะ',
            visitors: 'ผู้เยี่ยมชม',
            customer: 'ลูกค้า',
            partner: 'พันธมิตร',
            other: 'อื่นๆ',
            selectidentity: 'เลือกเอกสารยืนยันตัวตน',
            id: 'เลขบัตรประจำตัวประชาชน',
            passport: 'หนังสือเดินทาง',
            namesurname: 'ชื่อ-นามสกุล',
            firstname: 'ชื่อจริง',
            lastname: 'นามสกุล',
            selectthejourney: 'เลือกการเดินทาง',
            companysevice: 'บริษัทบริการ',
            carrentalcharter: 'รถเช่า-เช่าเหมาลำ',
            personalvehicle: 'ยานพาหนะส่วนบุคคล',
            carregistration: 'ทะเบียนรถ',
            fillinadditionalinformation: 'กรอกข้อมูลเพิ่มเติม',
            email: 'อีเมล',
            phonenumber: 'เบอร์โทรศัพท์',
            country1: 'ประเทศ',
            age: 'อายุ',
            next: 'ถัดไป',
        },
        
        showamodalhome3: {
            fill: 'กรุณากรอกข้อมูลให้ครบถ้วน ก่อนที่จะไปยังขั้นตอนต่อไป',
            ok: 'ตกลง',
        },

        home4: {
            journey: 'การเดินทาง',
            salesname: 'ชื่อผู้ขาย',
            visitdata: 'วันที่เข้าเยี่ยมชม',
            visittime: 'เวลาเยี่ยมชม',
            purposeofvisit: 'จุดประสงค์ของการเยี่ยมชม',
            carregistration: 'ทะเบียนรถ',
            status: 'สถานะ',
            date: 'วันที่',
            time: 'เวลา',
            email: 'อีเมล',
            phonenumber: 'เบอร์โทรศัพท์',
            country1: 'ประเทศ',
            age: 'อายุ',
            appointmentsummary:'สรุปการนัดหมาย',
            participants: 'ผู้เข้าร่วม',
            Press: 'กด',
            confirmyourbooking: 'กดปุ่ม "ยืนยัน" เพื่อยืนยันการจองของคุณ.',
            confirm: 'ยืนยัน',
            open: 'เปิด',
            pleaseselect: 'กรุณาเลือกเพื่อสร้างรหัส คิวอาร์โค้ด',
            thankyou: 'ขอบคุณครับ/ค่ะ',
            bookingconfirmation: 'กรุณารอรับการยืนยันการจอง',
            registeredemail: 'จดหมายไปยังที่อยู่อีเมลที่คุณลงทะเบียนไว้',
            contactus: 'หากมีข้อสงสัยสามารถติดต่อเราได้ที่',
            or:'หรือ',
            returnhomepage:'กลับสู่หน้าแรก',
            pleasepress: 'กรุณากด',
            confirmyour: 'เพื่อยืนยันการจองของคุณ',
            ok: 'ตกลง',
            completed: 'เสร็จสิ้น',
            registeredemailaddress: 'กรุณารอรับจดหมายยืนยันการจองผ่านทางอีเมลที่ท่านลงทะเบียนไว้',



        },


    }
};

const i18n = createI18n({
    locale: 'en', // default locale
    fallbackLocale: 'en',
    messages,
});

export default i18n;

/**
 * User: Eric Buitenhuis 
 * Date: Jun 25, 2008
 * Time: 8:07:09 PM
 */

package com.nitobi.jsf.example.backing.datepicker;

import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Calendar;

/**
 * FormBackingBean
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class FormBackingBean {

    private Date birthdate=null;

    public FormBackingBean() {
        Calendar rightNow = Calendar.getInstance();
        rightNow.add(Calendar.MONTH, 1);
        birthdate = new Date(rightNow.getTimeInMillis());

    }

    public Date getBirthdate() {
        System.out.println("getting birthdate.");
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        System.out.println("setting birthdate.");
        this.birthdate = birthdate;
    }

    public String enterBirthdate() {
        System.out.println("Entering birthdate.");
        return "success";
    }
}

/**
 * User: Eric Buitenhuis 
 * Date: Jun 13, 2008
 * Time: 10:23:21 PM
 */

package com.nitobi.jsf.example.backing.combo;

import com.nitobi.jsf.event.NitobiGetEvent;

/**
 * UserInput
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class UserInput {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String notes;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String doFoo(NitobiGetEvent event) {
        System.out.println("do foo");
        return null;
    }
}

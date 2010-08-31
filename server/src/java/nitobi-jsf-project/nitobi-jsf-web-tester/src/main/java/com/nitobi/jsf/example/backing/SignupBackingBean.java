/**
 * User: Eric Buitenhuis 
 * Date: Jun 29, 2008
 * Time: 9:11:40 PM
 */

package com.nitobi.jsf.example.backing;

import java.util.Date;

/**
 * SignupBackingBean
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class SignupBackingBean extends BackingBase {
    private String firstName;
    private String lastName;
    private String countryOfOrigin;
    private String city;
    private String stateOfResidency;
    private String supervisor;
    private String dateOfBirth;

    private String defaultCountryOfOrigin = "";

    public String submit() {
        System.out.println("firstName: " + firstName
                + ", lastName: " + lastName
                + ", countryOfOrigin: " + countryOfOrigin
                + ", stateOfResidency: " + stateOfResidency
                + ", supervisor: " + supervisor
                + ", dateOfBirth: " + dateOfBirth);

        return "success";
    }

    public String getCountryOfOrigin() {
        return countryOfOrigin;
    }

    public void setCountryOfOrigin(String countryOfOrigin) {
        this.countryOfOrigin = countryOfOrigin;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

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

    public String getStateOfResidency() {
        return stateOfResidency;
    }

    public void setStateOfResidency(String stateOfResidency) {
        this.stateOfResidency = stateOfResidency;
    }

    public String getSupervisor() {
        return supervisor;
    }

    public void setSupervisor(String supervisor) {
        this.supervisor = supervisor;
    }

    public String getDefaultCountryOfOrigin() {
        return defaultCountryOfOrigin;
    }

    public void setDefaultCountryOfOrigin(String defaultCountryOfOrigin) {
        this.defaultCountryOfOrigin = defaultCountryOfOrigin;
    }
}

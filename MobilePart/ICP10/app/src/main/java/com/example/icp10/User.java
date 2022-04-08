package com.example.icp10;

import com.google.gson.annotations.SerializedName;

public class User {
    private int id;

    @SerializedName("login")
    private String username;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}

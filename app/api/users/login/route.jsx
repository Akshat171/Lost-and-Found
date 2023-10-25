import { connect } from "@/app/(dbConfig)/dbConfig";
import User from "@/app/(models)/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    //check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User is not exist" }, { status: 400 });
    }

    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 401 });
    }

    //create Token data
    const tokenData = {
      id: user._id,
      name: user.username,
      email: user.email,
    };

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successfully!",
      success: true,
    });

    return response;

    response.cookies.set("token", token, { httpOnly: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

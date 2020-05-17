import React from "react";
import { Text, View } from "react-native";
import {getColors as colors} from "../styles/colors";

const HR = ({ size, color }) => (
	<View
		style={{
			borderBottomColor: color || colors.accent,
			borderBottomWidth: 1,
			margin: 10,
			width: size || "90%"
		}}
	/>
);

export default HR;

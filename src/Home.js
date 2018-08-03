import React, { Component } from "react"
import { Container, Box } from 'bloomer'
import Navigation from "./Nav/Navbar";
import HomeForm from "./HomeForm"
import SearchResults from "./SearchResults"
import APIController from ".//APIController"
import "./CSS/index.css"
import "./CSS/Collapsible.css"

export default class Home extends Component {

    // state = {
    //     ShowForm: true
    // }

    constructor(props) {
        super(props)
        this.state = {
            FormInfo: {
                ProMin: "",
                ProMax: "",
                CarbMin: "",
                CarbMax: "",
                FatMin: "",
                FatMax: "",
                FoodType: "",
                IngredType: "",
                Dairy: false,
                Egg: false,
                Gluten: false,
                Peanut: false,
                Treenut: false,
                Seafood: false,
                Sesame: false,
                Soy: false,
                Sulfate: false,
                Wheat: false,
                Cuisine: "",
                Meal: ""
            }
            ,
            ShowForm: true,
            recipes: []
        }
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this)
    }

    handleFieldChange = (e) => {
        const stateToChange = this.state.FormInfo
        stateToChange[e.target.id] = e.target.value
        this.setState({ FormInfo: stateToChange })
    }

    handleCheckboxChange = (event) => {
        const stateToChange = this.state.FormInfo
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        stateToChange[name] = value
        this.setState({
            FormInfo: stateToChange
        });
    }

    handleSelect = (event) => {
        const stateToChange = this.state.FormInfo
        const target = event.target
        const value = target.value
        const name = target.name
        if (event.target.id === "Cuisine") {
            stateToChange[name] = value
            this.setState({
                FormInfo: stateToChange,
            })
        } else if (event.target.id === "Meal") {
            stateToChange[name] = value
            this.setState({
                FormInfo: stateToChange
            })
        }
    }

    submitForm = (e, apiCall) => {
        e.preventDefault()
        let apiString
        let ingredArray = this.state.FormInfo.IngredType.split(", ")
        if (this.state.FormInfo.FoodType === "") {
            apiString += "&q=null"
        } else {
            apiString += "&q=" + this.state.FormInfo.FoodType
        }
        if (ingredArray[0] === "") {
            apiString
        } else {
            ingredArray.forEach(ingredient => {
                apiString += "&allowedIngredient[]=" + `${ingredient}`
            });
        }
        if (this.state.FormInfo.ProMin === "") {
            apiString += "&nutrition.PROCNT.min=0"
        } else {
            apiString += "&nutrition.PROCNT.min=" + this.state.FormInfo.ProMin
        }
        if (this.state.FormInfo.ProMax === "") {
            apiString += "&nutrition.PROCNT.max=100"
        } else {
            apiString += "&nutrition.PROCNT.max=" + this.state.FormInfo.ProMax
        }
        if (this.state.FormInfo.CarbMin === "") {
            apiString += "&nutrition.CHOCDF.min=0"
        } else {
            apiString += "&nutrition.CHOCDF.min=" + this.state.FormInfo.CarbMin
        }
        if (this.state.FormInfo.CarbMax === "") {
            apiString += "&nutrition.CHOCDF.max=100"
        } else {
            apiString += "&nutrition.CHOCDF.max=" + this.state.FormInfo.CarbMax
        }
        if (this.state.FormInfo.FatMin === "") {
            apiString += "&nutrition.FAT.min=0"
        } else {
            apiString += "&nutrition.FAT.min=" + this.state.FormInfo.FatMin
        }
        if (this.state.FormInfo.FatMax === "") {
            apiString += "&nutrition.FAT.max=100"
        } else {
            apiString += "&nutrition.FAT.max=" + this.state.FormInfo.FatMax
        }
        if (this.state.FormInfo.Cuisine === "") {
            apiString
        } else {
            apiString += "&allowedCuisine[]=cuisine^cuisine-" + this.state.FormInfo.Cuisine
        }
        if (this.state.FormInfo.Meal === "") {
            apiString
        } else {
            apiString + "&allowedCourse[]=course^course-" + this.state.FormInfo.Meal
        }
        apiCall = apiString
        APIController.getRecipes(apiCall).then((recipes) => {
            this.setState({
                ShowForm: false,
                recipes: recipes
            })
        })
    }

    showForm = (e) => {
        e.preventDefault()
        this.setState({
            ShowForm: true
        })
    }

    // testForm = (e) => {
    //     e.preventDefault()
    //     let apiCall
    //     // for (let field in this.state.FormInfo) {
    //     //     if (this.state.FormInfo[field] === "" || this.state.FormInfo[field] === false) {
    //     //         // console.log(apiCall = `${apiCall}&`)
    //     //         // alert("Please fill in all fields")
    //     //     }
    //     // }
    //     // console.log(this.state.FormInfo)

    //     console.log(apiCall)
    // }

    // showResults = (e) => {
    //     this.setState({
    //         ShowForm: false
    //     })
    // }

    render() {
        if (this.state.ShowForm) {
            return (
                <React.Fragment>
                    <Navigation />
                    <Container>
                        <Box id="main-box">
                            <HomeForm
                                showResults={this.showResults}
                                handleFieldChange={this.handleFieldChange}
                                handleCheckboxChange={this.handleCheckboxChange}
                                handleSelect={this.handleSelect}
                                testForm={this.submitForm}
                            />
                        </Box>
                    </Container>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Navigation />
                    <Container>
                        <Box id="main-box">
                            <SearchResults
                                showForm={this.showForm}
                                recipes={this.state.recipes} />
                        </Box>
                    </Container>
                </React.Fragment>
            )
        }
    }
}
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    tabPanel: {
        boxSizing: "border-box",
        display: "flex",
        width: "99%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        margin: "5px 0",
    },
    tabPanelHidden: {
        width: 0,
        height: 0
    }
})

export default function TabPanel(props){
    const { children, value, index } = props;
    const styles = useStyles()
    return (
        <div className={value!==index ? styles.tabPanelHidden : styles.tabPanel} hidden={value!==index}>
            {value === index && children}
        </div>
    )
}
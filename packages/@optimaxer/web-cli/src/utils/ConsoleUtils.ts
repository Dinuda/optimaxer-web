
export function getProgressBar(current:number, total:number):string {
    const percentage = Math.floor((current / total) * 100);

    let progressBar = "Extracting Content [ " + percentage + "% ]\n\n";
    for (let i = 0; i < 50; i++) {
        if (i < (percentage/2)) {
            progressBar += "█";
        } else {
            progressBar += "░";
        }
    }
    progressBar += "\n";

    return progressBar;
}
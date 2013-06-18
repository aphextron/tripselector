 <?php 

$data = file_get_contents("./data/tourModels.json");
$tourInfo = json_decode($data, true);
$compare = ($_GET);


function distance($a, $compare_with) {
    $in_common = 0;
    foreach ($compare_with as $key => $value) {
        $in_common += ($value == $a[$key]);
    }
    return $in_common;
}

function most_in_common($object_list, $compare_with) {
    $in_common = array();
    foreach ($object_list as $key => $val) {
        $in_common[$key] = distance($val, $compare_with);
    }
    return $object_list[array_search(max($in_common), $in_common)]["name"];
}
if ($compare["combo"] == "all") {
    $result = $tourInfo[10];
    echo $result["name"];

}
elseif ($compare["combo"] == "pearl") {
     $result = $tourInfo[9];
    echo $result["name"];
}
    elseif ($compare["combo"] == "northShore") {
     $result = $tourInfo[5];
    echo $result["name"];
}
    elseif ($compare["combo"] == "dole") {
     $result = $tourInfo[6];
    echo $result["name"];
}
    elseif ($compare["combo"] == "pearlDole") {
     $result = $tourInfo[4];
    echo $result["name"];
}
else{
echo(most_in_common($tourInfo, $compare));
}

?>
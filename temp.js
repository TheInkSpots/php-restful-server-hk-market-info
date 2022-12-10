filterCase = await initPeopleFilter($("#serviceUnitList"), $("#viewRecordList"), staff, true, true, $("#formStatusList"));

$("#viewRecordList").prepend(new Option('所有', ''));
$("#viewRecordList").prop('selectedIndex', 0);
$('#serviceUnitList').change();

$("select#serviceUnitList,select#formStatusList").change(async function () {
    let filterOpt = [];
    let filterTemp = [];
    let serviceUnitOptionElement = $("select#serviceUnitList");
    let formStatusOptionElement = $("select#formStatusList");
    let viewRecordOptionElement = $("#viewRecordList");
    let viewRecordSelectedOption = viewRecordOptionElement.val();

    filterTemp = filterCase;

    if (serviceUnitOptionElement.length > 0) {
        // if (serviceUnitOptionElement.prop('selectedIndex') != 0) {
        //nurse no need all service Unit BY victor
        filterTemp = filterTemp.filter(item => item.cr98a_serviceunits == serviceUnitOptionElement.val());
        // }

    }

    if (formStatusOptionElement.length > 0) {
        if (formStatusOptionElement.prop('selectedIndex') != 0) {
            filterTemp = filterTemp.filter(item => item.cr98a_formstatus == formStatusOptionElement.val());
        }
    }

    filterOpt = filterTemp.map(x => '<option value="' + x.cr98a_userinformationid + '">' + x.cr98a_namecn + ((x.cr98a_nameen) ? " |  " + x.cr98a_nameen : '') + '</option>');

    viewRecordOptionElement.empty();
    viewRecordOptionElement.append(new Option('所有', '', true, true));
    viewRecordOptionElement.append(filterOpt);

    if (viewRecordSelectedOption != "") {
        if (viewRecordSelectedOption && viewRecordOptionElement.find('option[value="' + viewRecordSelectedOption + '"]').length > 0) {
            viewRecordOptionElement.val(viewRecordSelectedOption).change();
        }
    }
});

async function initPeopleFilter(serviceUnitFilterListId, caseFilterListId, staff, isIncludeServiceUnitCase, isIncludePermissionCase, statusFilterListId, isSkipAllOptionForServiceUnitList = true, isICCMWHWH) {

    //Checking url has form name 

    let urlParam = parameters(window.top.location.href);
    if (!urlParam.params.formname) {
        console.log("url missing form name");
        return;
    }
    //Checking form
    if (!Object.keys(roleHaveAccessInGlobal).includes(urlParam.params.formname)) {
        console.log("formname role in global js error!");
        return;
    }
    //Checking input param
    if (serviceUnitFilterListId.length == 0 || caseFilterListId.length == 0 || staff == null) {
        console.log("filter Id error!");
        return;
    }
    //Checking the input staff
    if ($.isEmptyObject(staff)) {
        console.log("input staff err!");
        return;
    }
    //Get ICCMW HWH
    let ICCMWHWHList = await getServiceUnitByServiceProductCodeList(null, ['ICCMW', 'HWH']).then((data) => {
        return data;
    });


    let permissionCaseRecordid = [];
    let filterOpt = [];
    let serviceUnitOption = [];
    let serviceUnitTemp = [];
    let statusTemp = [];
    let statusOption = [];

    let allCase = [];
    let filterCase = []; // for return 

    let formName = (urlParam.params.formname) ? urlParam.params.formname : "";

    let staffEmail = staff.cr98a_userprincipalname;
    let isSkipAllServiceUnit = isArrayIncludeFormName(initPeopleFilterSkipAllOptionForServiceUnitList) && isSkipAllOptionForServiceUnitList;

    if (staff.cr98a_group.includes('_CMS_cat_IT')) {
        await getAllCase().then((value) => {
            if (value.length > 0) {
                allCase = value;
            }
        })
        //case
        filterCase = allCase;

        if (filterCase.length != 0) {
            filterOpt = filterCase.map(x => '<option value="' + x.cr98a_userinformationid + '">' + x.cr98a_namecn + '</option>');
        }
        $.each(caseFilterListId, (i, e) => {
            $(e).empty().append(filterOpt);
        });
    }
    else {
        let roleHaveAccessInGlobalResult = false;
        roleHaveAccessInGlobal[formName].forEach((role) => {
            if (staff.cr98a_group.includes(role)) {
                roleHaveAccessInGlobalResult = true;
                return false;
            }
            return true;
        });
        isIncludeServiceUnitCase = isIncludeServiceUnitCase && roleHaveAccessInGlobalResult;
        if (isIncludePermissionCase) {
            await getOwnServiceUsers(staffEmail).then((value) => {
                if (value.length > 0) {
                    permissionCaseRecordid = value.map(x => x.cr98a_caseregistrationno);
                }
            });
        }
        let filter = [];
        if (isIncludeServiceUnitCase == true) {
            filter.push({ custom: '(' });
            staff.cr98a_department.split(",").forEach((department, index) => {
                if (index == 0) {
                    filter.push({ custom: '(' });
                }
                filter.push({ division: "or", column: "cr98a_serviceunits", operator: "eq", value: department, type: "Text" });
                if (index == staff.cr98a_department.split(",").length - 1) {
                    filter.push({ custom: ')' });
                }
            });

            filter.push({ custom: 'and (' });
            filter.push({ division: "or", column: "cr98a_formstatus", operator: "eq", value: 'Approved', type: "Text" });
            filter.push({ division: "or", column: "cr98a_formstatus", operator: "eq", value: 'Discharged', type: "Text" });
            if (Object.keys(formnameCaseStatus).includes(urlParam.params.formname)) {
                formnameCaseStatus[urlParam.params.formname].forEach(formStatus => { filter.push({ division: "or", column: "cr98a_formstatus", operator: "eq", value: formStatus, type: "Text" }); })
            }
            filter.push({ custom: ')' });

            filter.push({ custom: ')' });
        }
        if (arrayIncludes(staff.cr98a_group, Object.keys(isReferralRequiredServiceunit))) {
            let renderServiceUnit = [];
            for (const [key, value] of Object.entries(isReferralRequiredServiceunit)) {
                let processGroup = staff.cr98a_group.split(',').find(x => x == key);
                if (processGroup != null) {
                    renderServiceUnit = renderServiceUnit.concat(await getReferralRequiredServiceunit(!IsNull(staff.cr98a_group) ? staff.cr98a_group.split(',') : null, isReferralRequiredServiceunit[processGroup], 'ne'));
                }
            }
            if (renderServiceUnit.length > 0) {
                let tempRenderServiceUnit = [];
                tempRenderServiceUnit = renderServiceUnit.map(x => {
                    return {
                        division: "or", column: "cr98a_serviceunits", operator: "eq", value: x.cr98a_servicecode, type: "Text"
                    };
                });
                if (tempRenderServiceUnit.length > 0) {
                    tempRenderServiceUnit.unshift({ custom: 'and (' });
                    tempRenderServiceUnit.push({ custom: ')' });
                }
                filter = filter.concat(tempRenderServiceUnit);
            }
        }
        if (permissionCaseRecordid.length != 0) {
            $.each(permissionCaseRecordid, (index, element) => {
                if (index == 0) {
                    filter.push({ custom: 'or (' });
                } else {
                    filter.push({ custom: 'or ' });
                }
                filter.push({ custom: '(' });
                filter.push({ division: "and", column: "cr98a_userinformationid", operator: "eq", value: element, type: "GUID" });
                filter.push({ custom: ')' });
                if (index == permissionCaseRecordid.length - 1) {
                    filter.push({ custom: 'and (' });
                    filter.push({ division: "or", column: "cr98a_formstatus", operator: "eq", value: 'Approved', type: "Text" });
                    filter.push({ division: "or", column: "cr98a_formstatus", operator: "eq", value: 'Discharged', type: "Text" });
                    if (Object.keys(formnameCaseStatus).includes(urlParam.params.formname)) {
                        formnameCaseStatus[urlParam.params.formname].forEach(formStatus => { filter.push({ division: "or", column: "cr98a_formstatus", operator: "eq", value: formStatus, type: "Text" }); })
                    }
                    filter.push({ custom: ')' });
                    filter.push({ custom: ')' })
                }
            })
        }
        console.log('filter', filter);
        let params = { entity: "cr98a_userinformations", filter: filter, orderby: 'cr98a_namecn asc' };
        await queryEntity(params).then(async (value) => {
            if (value.length > 0) {
                filterCase = value;
                if (!IsNull(isICCMWHWH)) {
                    let tempICCMWHWHList = ICCMWHWHList.map(x => x.cr98a_serviceunitcode);
                    if (isICCMWHWH == true) {
                        filterCase = filterCase.filter(x => tempICCMWHWHList.includes(x.cr98a_serviceunits));
                    } else {
                        filterCase = filterCase.filter(x => !tempICCMWHWHList.includes(x.cr98a_serviceunits));
                    }
                }
                let idList = filterCase.map(x => x.cr98a_userinformationid);
                let serviceList = $.unique(filterCase.filter(x => x.cr98a_serviceunits != null).map(x => x.cr98a_serviceunits).sort());
                // let objList = filterCase.map(x => { return { 'cr98a_userinformationid': x.cr98a_userinformationid, 'cr98a_formstatus': x.cr98a_formstatus } });
                filterCase = await getLatestBasicInformationInGlobal(idList, serviceList, filterCase);
            }
        })
        //filter sort chinese name
        filterCase.sort((a, b) => {
            if (IsNull(a.cr98a_namecn)) return 1;
            if (IsNull(b.cr98a_namecn)) return -1;
            if (IsNull(a.cr98a_namecn) && IsNull(b.cr98a_namecn)) return 0;

            let nameA = a.cr98a_namecn ? a.cr98a_namecn.toUpperCase() : ''; // ignore upper and lowercase
            let nameB = b.cr98a_namecn ? b.cr98a_namecn.toUpperCase() : ''; // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        //filter sort english name
        filterCase.sort((a, b) => {
            if (IsNull(a.cr98a_nameen)) return 1;
            if (IsNull(b.cr98a_nameen)) return -1;
            if (IsNull(a.cr98a_nameen) && IsNull(b.cr98a_nameen)) return 0;

            let nameA = a.cr98a_nameen ? a.cr98a_nameen.toUpperCase() : ''; // ignore upper and lowercase
            let nameB = b.cr98a_nameen ? b.cr98a_nameen.toUpperCase() : ''; // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        if (filterCase.length != 0) {
            let filterCaseTemp;

            if (isSkipAllServiceUnit) {
                if (staff.cr98a_department.split(',').length > 1) {
                    filterCaseTemp = filterCase.filter(user => user.cr98a_serviceunits == staff.cr98a_department.split(',')[0]);
                }
                else
                    filterCaseTemp = filterCase.filter(user => user.cr98a_serviceunits == staff.department);

            }
            else
                filterCaseTemp = filterCase;

            filterOpt = filterCaseTemp.map(x => '<option value="' + x.cr98a_userinformationid + '">' + x.cr98a_namecn + ((x.cr98a_nameen) ? " |  " + x.cr98a_nameen : '') + '</option>');
        } else {
            permissionEvent('case', false);
        }

        $.each(caseFilterListId, (i, e) => {
            $(e).empty().append(filterOpt);
        });
    }



    //form status
    if (!IsNull(statusFilterListId) && statusFilterListId.length > 0) {
        if (filterCase.length != 0) {
            statusTemp = $.unique(filterCase.map(x => x.cr98a_formstatus).sort());

            statusTemp.forEach((x) => {
                let item = '<option value="' + x + '">' + x + '</option>';
                statusOption.push(item);
            });
        }
        $.each(statusFilterListId, (i, e) => {
            $(e).empty();
            renderOptionListByAttribute(null, $(e), { "": "所有" });
            $(e).append(statusOption).change();
        });
    }

    //service Unit
    if (!IsNull(serviceUnitFilterListId) && serviceUnitFilterListId.length > 0) {
        if (filterCase.length != 0) {
            serviceUnitTemp = $.unique(filterCase.map(x => x.cr98a_serviceunits).sort());

            serviceUnitTemp.forEach((x) => {
                let item = '<option value="' + x + '">' + x + '</option>';
                serviceUnitOption.push(item);
            });
        }

        $.each(serviceUnitFilterListId, (i, e) => {
            $(e).empty();

            if (!isSkipAllServiceUnit)
                renderOptionListByAttribute(null, $(e), { "": "所有" });

            $(e).append(serviceUnitOption);

            if (isSkipAllServiceUnit) {
                if (staff.cr98a_department.split(',').length > 1) {
                    $(e).prop('selectedIndex', 0);
                }
                else
                    $(e).val(staff.cr98a_department);
            }

            $(e).change();
        });


    }


    return filterCase;
}



if (filterCase.length != 0) {
                serviceUnitTemp = $.unique(filterCase.map(x => x.cr98a_serviceunits).sort());

                serviceUnitTemp.forEach((x) => {
                    let item = '<option value="' + x + '">' + x + '</option>';
                    serviceUnitOption.push(item);
                });
            }